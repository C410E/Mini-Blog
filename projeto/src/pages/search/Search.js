import styles from './Search.module.css';
import { Link } from 'react-router-dom';

//hooks
import { useFatchDocuments } from '../../hooks/useFatchDocuments';
import { useQuery } from '../../hooks/useQuery';
//components
import PostDetail from '../../components/PostDetail';

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFatchDocuments("post", search);

    return(
        <div className={styles.search_container}>
            <h2>Search</h2>
          <div>
            {posts && posts.length  === 0 && (
                <div className={styles.noposts}>
                <p>Não foram encontrados posts apartir da sua busca...</p>
                <Link to='/' className='btn btn-dark'>Voltar</Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post}/>
            ))}
          </div>
        </div>
    );
};

export default Search;