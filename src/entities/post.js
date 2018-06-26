const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:  { 
        type: String, 
        // Данное поле обязательно. 
        // Если его нет вывести ошибку с текстом title Required
        required:[true, "Title Required"],
        
        // Минимальная длинна 6 Юникод символа
        
        minlength:[6, "Too Short"],
        unique:true // должно быть уникальным
    },

    content: { 
        type: String, 
        required:[true, "Text Required"]
    },
    status: {
        type: String,
        enum: ['published', 'private', 'draft'],
        default: 'draft'
    },
  
    hidden: {
        type: Boolean,
        default: false
    },
  
    meta: {
          votes: Number,
          favs:  Number
    },
  
    thumbnail: Buffer,
  
    category: {type: Schema.ObjectId, ref: 'Category', required: true},
    
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    
    published_at: { type: Date, default: Date.now },
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // true 
}
);

// Virtual for book's URL
PostSchema
.virtual('url')
.get(function () {
  return '/post/' + this._id;
});

//Export model
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
