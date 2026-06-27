import { useEffect, useState } from 'react';
import { getDishes } from './api/dishes';

type Dish = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

function App() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    getDishes().then(setDishes);
  }, []);

  return (
    <div>
      <h1>Food Ordering</h1>

      {dishes.map((dish) => (
        <div key={dish.id}>
          <img
            src={dish.imageUrl}
            alt={dish.name}
            width={200}
          />
          <h2>{dish.name}</h2>
          <p>{dish.price} ₽</p>
        </div>
      ))}
    </div>
  );
}

export default App;