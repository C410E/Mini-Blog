//Postu = post unico
import styles from './Postu.module.css';

//hooks 
import { useParams } from 'react-router-dom';
import { useFatchDocument } from '../../hooks/useFatchDocument';



const Postu = () => {
    const { id } = useParams();
    const {documnt: post} = useFatchDocument("posts", id);
    return(
        <div>
           {post && (
            <>
            <h1>{post.title}</h1>
            </>
           )}
        </div>
    )
}

export default Postu;