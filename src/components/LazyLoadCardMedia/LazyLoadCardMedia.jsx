import React, {useState, useEffect, useRef} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import * as S from './LazyLoadingCardMedia.module.scss';
import PropTypes from 'prop-types';

const LazyLoadCardMedia = ({image, title}) => {
  const [visible, setVisible] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (!visible && placeholderRef.current) {
      const observer = new IntersectionObserver(([{intersectionRatio}]) => {
        if (intersectionRatio > 0) {
          setVisible(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [visible, placeholderRef]);

  return visible ? (
    <CardMedia component='img' className={S.media} image={image} title={title} />
  ) : (
    <div className={S.preloadDiv} aria-label={title} ref={placeholderRef} />
  );
};

LazyLoadCardMedia.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LazyLoadCardMedia;
