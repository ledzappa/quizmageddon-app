import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Category, Player } from '../../interfaces/interfaces';
import './SelectCategory.css';

export default function SelectCategory({
  currentPlayer,
  setCurrentCategory,
  categories,
  play,
}: {
  currentPlayer: Player;
  setCurrentCategory: any;
  categories: Category[];
  play: any;
}) {
  const [activeCategory, setActiveCategory] = useState({
    id: 0,
    identifier: '',
    name: '',
  });
  const history = useHistory();

  useEffect(() => {
    if (categories.length > 0 && currentPlayer.perks.freedomOfChoice === 0) {
      randomizeCategory();
    }
  }, [categories]);

  const randomizeCategory = () => {
    let count = 0;
    let prevRandomIndex: any;
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * categories.length);
      while (randomIndex === prevRandomIndex) {
        randomIndex = Math.floor(Math.random() * categories.length);
      }
      setActiveCategory(categories[randomIndex]);
      prevRandomIndex = randomIndex;
      count++;
      if (count === 15) {
        clearInterval(interval);
        setCurrentCategory(categories[randomIndex]);
        setTimeout(() => history.push('/question'), 2000);
      }
      play();
    }, 200);
  };

  const handleClick = (category: Category) => {
    if (currentPlayer.perks.freedomOfChoice > 0) {
      setCurrentCategory(category);
      history.push('/question');
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <h1 className="mb-0 text-uppercase">
          {currentPlayer.name}
        </h1>
        <div>"{currentPlayer.description}"</div>
        <div>({currentPlayer.points} points)</div>
        {currentPlayer.perks.freedomOfChoice > 0 && (
          <div>
            Freedom Of Choice left: {currentPlayer.perks.freedomOfChoice}
          </div>
        )}
      </div>
      <div className="row">
        {categories.map((item: Category, idx: number) => (
          <div className="col-6 p-0" key={idx}>
            <div
              onClick={() => handleClick(item)}
              className={
                'category text-center ' +
                item.identifier +
                (item.name === activeCategory?.name ? ' active' : '')
              }
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
