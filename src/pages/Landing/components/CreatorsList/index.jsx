import styles from "../CreatorsList/index.module.scss"
import CreatorCard from '../CreatorCard/index';

const CreatorList = ({ creators }) => {
    return (
        <div>
            {creators.map((creator) => (
                <CreatorCard key={creator.username} data={creator} />
            ))}
        </div>
    );
};

export default CreatorList;