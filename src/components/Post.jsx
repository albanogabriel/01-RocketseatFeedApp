import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'
import { useState } from 'react'

export function Post({ author, publishedAt, content }) {
    const [comments, setComments] = useState([
        'Post muito bacana, hein!'
    ])

    const [ newCommentText, setNewCommentText ] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleAddComment() {
        event.preventDefault()

        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentChange() {
        //se eu quero adicionar esse valor ao meu estado:
        setNewCommentText(event.target.value)
    }
    
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                
                    {content.map(item => {
                        if (item.type === 'paragraph') {
                            return <p>{item.content}</p>
                        } else if (item.type === 'link') {
                            return <p><a href="">{item.content}</a></p>
                        }
                    })}

                    <form onSubmit={handleAddComment} className={styles.commentForm}>
                        <strong>Deixa seu feedback</strong>
                        <textarea 
                            name="comment" 
                            placeholder="deixe um comentário"
                            value={newCommentText}
                            onChange={handleNewCommentChange}
                        />
                        <footer>
                            <button type="submit">Publicar</button>
                        </footer>
                    </form>

                    <div className={styles.commentList}>
                        {comments.map(comment => {
                            //o comment é = o valor no array = 'Post muito bacana, hein!'
                            // 'Post muito bacana, hein!' é passado como props
                            return <Comment content={comment} />
                        })}
                    </div>  
                </div>                        
        </article>
    )
}