import { sql } from 'drizzle-orm';
import {boolean, date, integer, json, pgTable,serial, text, varchar} from 'drizzle-orm/pg-core';
//to add/update table- 1.create new schema 2.cmd npx drizzle-kit push 3. cmd npx drizzle-kit studio
export const USER_TABLE=pgTable('users',{
    id:serial().primaryKey(),
    userName:varchar().notNull(),
    email:varchar().notNull(),
    isMember:boolean().default(false),
    credits:integer().default(5),
})

export const STUDY_MATERIAL_TABLE=pgTable('studyMaterial',{
    id:serial().primaryKey(),
    courseId:varchar().notNull(),
    courseType:varchar().notNull(),
    topic:varchar().notNull(),
    difficultyLevel:varchar().default('Easy'),
    courseLayout:json(),
    createdBy:varchar().notNull(),
    status:varchar().default('Generating'),
    date:date().defaultNow()
})

export const CHAPTER_NOTES_TABLE=pgTable('chapterNotes',{
    id:serial().primaryKey(),
    courseId:varchar().notNull(),
    chapterId:integer().notNull(),
    notes:text()
    
})

export const STUDY_TYPE_CONTENT_TABLE=pgTable('studyTypeContent',{
    id:serial().primaryKey(),
    courseId:varchar().notNull(),
    content:json(),
    type:varchar().notNull(),
    status:varchar().default('Generating')
    
})

export const PAYMENT_RECORD_TABLE=pgTable('paymentRecord',{
    id:serial().primaryKey(),
    customerId:varchar(),
    sessionId:varchar()
    
})