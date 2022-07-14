import {createRoot} from 'react-dom/client';
import '@fontsource/inter';
import './styles/index.scss';
import {Fireworks} from 'fireworks-js/dist/react';

import {css} from '@emotion/css';

const App = () => {
  return (
    <div>
      <h2>Hello</h2>
      {/* https://github.com/crashmax-dev/fireworks-js/#options */}
      <Fireworks
        options={{
          hue: {
            min: 0,
            max: 345,
          },
          delay: {
            min: 15,
            max: 15,
          },
          rocketsPoint: 50,
          speed: 3,
          acceleration: 1,
          friction: 0.96,
          gravity: 1,
          particles: 90,
          trace: 3,
          intensity: 6.13,
          explosion: 6,
          autoresize: true,
          brightness: {
            min: 50,
            max: 80,
            decay: {
              min: 0.015,
              max: 0.03,
            },
          },
          boundaries: {
            visible: false,
          },
          sound: {
            enabled: false,
            files: [
              'https://fireworks.js.org/sounds/explosion0.mp3',
              'https://fireworks.js.org/sounds/explosion1.mp3',
              'https://fireworks.js.org/sounds/explosion2.mp3',
            ],
            volume: {
              min: 1,
              max: 11,
            },
          },
          mouse: {
            click: true,
            move: false,
            max: 1,
          },
        }}
        className={css`
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          position: fixed;
          background: #000;
        `}
      />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
