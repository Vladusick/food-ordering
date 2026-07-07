import { useParams } from "react-router-dom";

export const DishPage = () => {
    const { id } = useParams();

    return (
        <div>
            Блюдо {id}
        </div>
    );
};