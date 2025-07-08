

interface BlogCardProps{
    author: string;
    title: string;
    description: string;
    publishedDate: string;
}

export const BlogCard = ({
    author,
    title,
    description,
    publishedDate
}: BlogCardProps)=>{
    return (
        <div>
            <div>
                <div>
                    {author}     {publishedDate}
                </div>
                <div>
                    {title}
                </div>
                <div>
                    {description.substring(30) + "..."} 
                </div>
                <div>
                    {`${Math.ceil(description.length/100)} minutes read`}
                </div>
            </div>
        </div>
    )
}