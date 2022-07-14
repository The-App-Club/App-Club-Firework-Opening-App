import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';
import * as d3 from 'd3';
import {transform} from 'framer-motion';
import {samples} from 'culori';
import gsap from 'gsap';

const {Timeline, Burst} = mojs;

const MojsExample = ({tik}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline({
      onStart(isForward, isYoyo) {
        // console.log(`onStart`);
      },
      onProgress(p, isForward, isYoyo) {
        // console.log(`onProgress`, p);
      },
      onComplete(isForward, isYoyo) {
        // console.log('onComplete');
      },
    });
  }, [tik]);

  const rocketStartOffsetX = useMemo(() => {
    return gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2);
  }, [tik]);

  const lineParameters = useMemo(() => {
    return {
      origin: `center center`,
      left: '50%',
      top: '100%',
      shape: 'line',
      radius: window.matchMedia('(max-width: 768px)').matches ? 425 : 575,
      stroke: 'grey',
      strokeWidth: {5: 1},
      strokeDasharray: '100% 100%',
      easing: 'cubic.out',
      rotate: 90,
      duration: 2200,
      x: rocketStartOffsetX,
      y: 0,
      strokeDashoffset: {'-100%': '100%'},
    };
  }, [rocketStartOffsetX]);

  const sparkParametersList = useMemo(() => {
    return samples(3)
      .map((t) => {
        return t * 0.4;
      })
      .map((t, index) => {
        return {
          origin: `center center`,
          top: `50%`,
          left: `50%`,
          x: 0,
          y: -135 * t - 100,
          radius: {15: 475},
          count: 18,
          delay: 150 * index,
          children: {
            delay: 300 * index,
            duration: 2000,
            stroke: ['#EF9F9F', '#FFD9C0', '#8CC0DE'],
            strokeWidth: {5: 1},
            shape: ['line'],
            degreeShift: 'rand(-360, 360)',
            delay: 'stagger(0, 5)',
          },
        };
      });
  }, [rocketStartOffsetX]);

  const createFirework = ({parentDom, sparkParametersList, offsetX, delay}) => {
    return {
      line: new mojs.Shape({
        ...lineParameters,
        x: offsetX,
        delay,
        parent: parentDom,
      }),
      sparks: sparkParametersList.map((sparkParameters) => {
        return new mojs.Burst({
          ...sparkParameters,
          x: offsetX,
          delay,
          parent: parentDom,
        });
      }),
    };
  };

  useEffect(() => {
    const {line: line1, sparks: sparks1} = createFirework({
      parentDom: animDom.current,
      offsetX: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
      sparkParametersList,
      delay: 0,
    });
    const {line: line2, sparks: sparks2} = createFirework({
      parentDom: animDom.current,
      offsetX: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
      sparkParametersList,
      delay: 300,
    });
    const {line: line3, sparks: sparks3} = createFirework({
      parentDom: animDom.current,
      offsetX: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
      sparkParametersList,
      delay: 600,
    });
    const {line: line4, sparks: sparks4} = createFirework({
      parentDom: animDom.current,
      offsetX: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
      sparkParametersList,
      delay: 900,
    });
    const {line: line5, sparks: sparks5} = createFirework({
      parentDom: animDom.current,
      offsetX: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
      sparkParametersList,
      delay: 1200,
    });

    // tl.add([line1, line2, line3, line4, line5]).append([
    //   ...sparks1,
    //   ...sparks2,
    //   ...sparks3,
    //   ...sparks4,
    //   ...sparks5,
    // ]);

    tl.add([line1]).append([...sparks1]);
    // tl.add([line2]).append([...sparks2]);
    // tl.add([line3]).append([...sparks3]);
    // tl.add([line4]).append([...sparks4]);
    // tl.add([line5]).append([...sparks5]);

    return () => {};
  }, [tik]);

  useEffect(() => {
    if (!tik) {
      return;
    }
    tl.play();
    return () => {};
  }, [tik]);

  return (
    <div
      ref={animDom}
      className={css`
        background: #333;
        position: relative;
        border: 1px solid;
        /* max-width: 30rem;
        min-height: 40rem; */
        max-width: 100%;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
      `}
    />
  );
};

export {MojsExample};
