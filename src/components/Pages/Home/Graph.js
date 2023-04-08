

import React, { useState, useEffect } from 'react';
import styles from "./Graph.module.css";

function Graph({ params }) {
  
  const [positions, setPositions] = useState(
    params.map((param) => ({
      x: param.initial_position_X,
      y: param.initial_position_Y,
      s: param.speed,
    }))
  );
  const [directions, setDirections] = useState(
    params.map((param) => param.direction)
  );
  //console.log("positiosnsnsjfdhkjshgkjshg ", positions)
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((positions) =>
        positions.map((position, i) => {
          // console.log(params[i])
          const { speed } = params[i];
          let { x, y} = position;
          const direction = directions[i];

          if (direction === "Towards") {
            y -= speed;
            if (y < 0) {
              y = -y;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? "Backwards" : dir))
              );
            }
          } else if (direction === "Backwards") {
            y += speed;
            if (y > 215) {
              y = 430 - y;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? "Towards" : dir))
              );
            }
          } else if (direction === "Upwards") {
            x -= speed;
            if (x < 0) {
              x = -x;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? "Downwards" : dir))
              );
            }
          } else if (direction === "Downwards") {
            x += speed;
            if (x > 570) {
              x = 1140 - x;
              setDirections((directions) =>
                directions.map((dir, j) => (i === j ? "Upwards" : dir))
              );
            }
          }

          return { x, y };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [positions, directions, params]);

  const cells = [];
  // console.log(positions);
  for (let i = 0; i < 6; i++) {
    // 6 rows
  
    for (let j = 0; j < 14; j++) {
      // 14 columns
      cells.push(
        <div className={styles.cell} key={i * 14 + j + 1}>
          {positions.map(
            (position, k) =>
              i === Math.floor(position.y / 36.5) &&
              j === Math.floor(position.x / 42.9) && (
                <div className={styles.point} key={k}   style={{
                    backgroundColor: `#${Math.floor(
                      Math.random() * 16777215
                    ).toString(16)}`,
                  }}>
                  {k+1}
                </div>
              )
          )}
        </div>
      );
    }
  }
  // console.log(cells);
  return <div className={styles.table}>{cells}</div>;
}

export default Graph;