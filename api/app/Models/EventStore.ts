import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class EventStore extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public start_event: string

    @column()
    public end_event: string

    @column()
    public content_event: string

    @column()
    public title_event: string

    @column()
    public event_image: string

    @column()
    public is_online: boolean


    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
