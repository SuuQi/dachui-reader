/*
 * @Author: hzsuqin 
 * @Last Modified by: hzsuqin
 * @description: reader模块Model文件
 */

export default (app: any) => {
    const mongoose = app.mongoose;
    const HelloSchema = new mongoose.Schema({
        openid: { type: 'string', required: true },
        sessionId: { type: 'string', required: true },
        books: [
            {
                title: { type: 'string', required: true },
                id: { type: 'string', required: true },
                lastIndex: { type: 'number', default: 0 },
                book: { type: 'string', required: true },
                chaptersUpdated: { type: 'string', default: '' },
                updated: { type: 'string', default: '' },
                author: { type: 'string', required: true },
                cover: { type: 'string', required: true }
            }
        ]
    });

    return mongoose.model('ReaderUser', HelloSchema);
}
