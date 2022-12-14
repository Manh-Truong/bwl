import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction, ReactionDocument } from './Reaction/reaction.schema';
import { emojis } from './constants';
import { Message, MessageDocument } from './Message/message.schema';
import { Comment, CommentDocument } from './Comment/comment.schema';
import { Like, LikeDocument } from './Like/like.schema';
import {
  Notification,
  NotificationDocument,
} from './Notification/notification.schema';

import { Observable, Subject } from 'rxjs';
import { KomuUsers, KomuUsersDocument } from './Komu_users/komu_users.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Reaction.name)
    private readonly komuReaction: Model<ReactionDocument>,
    @InjectModel(Message.name)
    private readonly komuMessage: Model<MessageDocument>,
    @InjectModel(Comment.name)
    private readonly komuComment: Model<CommentDocument>,
    @InjectModel(Like.name)
    private readonly komuLike: Model<LikeDocument>,
    @InjectModel(Notification.name)
    private readonly komuNotification: Model<NotificationDocument>,
    @InjectModel(KomuUsers.name)
    private readonly komuUser: Model<KomuUsersDocument>,
  ) {}

  async findLikeFromDiscordId(
    authorId: string,
    messageId: string,
  ): Promise<any> {
    return this.komuLike.findOne({ authorId: authorId, messageId: messageId });
  }
  async findLikeMessageFromDiscordId(messageId: string): Promise<any> {
    return this.komuLike.find({ messageId: messageId });
  }

  // async findLikeAuthorId(messageId: string): Promise<any> {
  //   return this.komuMessage.find({ messageId: messageId });
  // }

  async findCommentFromDiscordId(messageId: string): Promise<any> {
    return this.komuMessage.find({
      messageId: messageId,
    });
  }
  async findCommentMessageFromDiscordId(id: string): Promise<any> {
    return this.komuUser.findOne({ id: id });
  }

  async findLikeId(messageId: string): Promise<any> {
    return this.komuMessage.find({
      messageId: messageId,
    });
  }
  async findLikeMessageId(id: string): Promise<any> {
    return this.komuUser.findOne({ id: id });
  }

  private events = new Subject<MessageEvent>();

  addEvent(event) {
    this.events.next(event);
  }

  sendEvents(): Observable<MessageEvent> {
    return this.events.asObservable();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getAll(page: number) {
    const aggregatorOpts = [
      { $match: { channelId: '924543969357099018' } },
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * 20 },
      { $limit: 20 },
      {
        $lookup: {
          from: 'komu_users',
          localField: 'authorId',
          foreignField: 'id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $lookup: {
          from: 'komu_bwlreactions',
          localField: 'messageId',
          foreignField: 'messageId',
          as: 'reactions',
        },
      },
      {
        $lookup: {
          from: 'komu_bwlcomments',
          localField: 'messageId',
          foreignField: 'messageId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'komu_bwllikes',
          localField: 'authorId',
          foreignField: 'authorId',
          as: 'likes',
        },
      },
      {
        $lookup: {
          from: 'komu_bwlnotifications',
          localField: 'authorId',
          foreignField: 'authorId',
          as: 'notifications',
        },
      },
    ];
    const data = await this.komuMessage.aggregate(aggregatorOpts as any).exec();
    
    for (const item of data) {
      item.reactions = item.reactions.reduce((result, reaction) => {
        const exists = result.find((e) => e.name === reaction.emoji);
        const emojiWithId = emojis.find((e) => e.name === reaction.emoji);
        if (exists) {
          exists.count++;
        } else {
          result.push({
            ...reaction,
            name: reaction.emoji,
            count: 1,
            ...(emojiWithId ? { id: emojiWithId.id } : {}),
          });
        }
        return result;
      }, []);
      item.totalComment = await this.komuComment
        .count({
          messageId: item.messageId,
        })
        .exec();

      item.totalLike = await this.komuLike
        .count({
          messageId: item.messageId,
        })
        .exec();

      item.totalNotification = await this.komuNotification
        .count({
          messageId: item.messageId,
        })
        .exec();
    }
    return data;
  }

  async getComments(messageId: string) {
    return this.komuComment
      .aggregate([
        {
          $match: {
            messageId,
          },
        },
        {
          $lookup: {
            from: 'komu_users',
            localField: 'authorId',
            foreignField: 'id',
            as: 'author',
          },
        },
      ])
      .exec();
  }

  async comment({ messageId, content, authorId }) {
    const comment = new this.komuComment({
      messageId,
      authorId,
      content,
      createdTimestamp: Date.now(),
    });
    const message = await this.komuMessage.find({ messageId }).exec();

    const messageAuthor = await this.komuUser
      .findOne({ id: message[0].authorId })
      .exec();

    const commentAuthor = await this.komuUser.findOne({ id: authorId }).exec();
    const notification = new this.komuNotification({
      messageId,
      authorId,
      content,
      createdTimestamp: Date.now(),
    });

    await comment.save();
    await notification.save();
    this.addEvent({ data: { comment, commentAuthor, message, messageAuthor } });
    return comment;
  }

  async getLikes(messageId: string) {
    return this.komuLike
      .aggregate([
        {
          $match: {
            messageId,
          },
        },
        {
          $lookup: {
            from: 'komu_users',
            localField: 'authorId',
            foreignField: 'id',
            as: 'author',
          },
        },
      ])
      .exec();
  }

  async like({ messageId, authorId }) {
    const like = new this.komuLike({
      messageId,
      authorId,
      createdTimestamp: Date.now(),
    });

    const message = await this.komuMessage.find({ messageId }).exec();

    const messageAuthor = await this.komuUser
      .findOne({ id: message[0].authorId })
      .exec();

    const likeAuthor = await this.komuUser.findOne({ id: authorId }).exec();

    const notification = new this.komuNotification({
      messageId,
      authorId,
      createTimestamp: Date.now(),
    });

    await like.save();
    await notification.save();
    this.addEvent({ data: { like, likeAuthor, message, messageAuthor } });
    return like;
  }

  async unlike({ messageId, authorId }) {
    const dislike = await this.komuLike
      .remove({
        messageId,
        authorId,
      })
      .exec();
    return true;
  }

  async getNotifications(messageId: string) {
    return this.komuNotification
      .aggregate([
        {
          $match: {
            messageId,
          },
        },
        {
          $lookup: {
            from: 'komu_users',
            localField: 'authorId',
            foreignField: 'id',
            as: 'author',
          },
        },
        {
          $lookup: {
            from: 'komu_bwls',
            localField: 'messageId',
            foreignField: 'messageId',
            as: 'message',
          },
        },
      ])
      .exec();
  }
}
