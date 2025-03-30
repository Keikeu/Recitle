import React, { useMemo, useState } from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Skeleton from "commons/components/Skeleton";
import emptyPlate from "commons/images/empty-plate.jpeg";
import { useUpdateEffect } from "commons/util/useUpdateEffect";
import { APP_URL_DEV } from "commons/util/constants";
import Loader from "commons/components//Loader";

const ImageWrap = styled.div`
  position: relative;
`;

const AbsoluteSkeleton = styled(Skeleton)`
  position: absolute;
`;

const Img = styled.img`
  object-fit: cover;
  opacity: 0;

  ${({ isLoading }) =>
    !isLoading &&
    css`
      opacity: 1;
    `}
`;

function Image({
  className,
  src,
  alt,
  width,
  height,
  fallback = emptyPlate,
  onClick,
  isRemote = false,
  loader = "skeleton",
}) {
  const [isLoading, setIsLoading] = useState(false);

  useUpdateEffect(() => {
    if (!isLoading) setIsLoading(true);
  }, [src]);

  const remoteSrc = useMemo(() => {
    return (window.location.hostname === "localhost" ? APP_URL_DEV : window.location.origin) + src;
  }, [src]);

  return (
    <ImageWrap>
      {isLoading && loader === "skeleton" && (
        <AbsoluteSkeleton className={className} variant="rectangle" width={width} height={height} />
      )}
      {isLoading && loader === "spinner" && <Loader containerHeight="100vh" />}
      <Img
        className={className}
        isLoading={isLoading}
        alt={alt}
        src={isRemote ? remoteSrc : src}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onError={({ currentTarget }) => {
          currentTarget.src = fallback;
          setIsLoading(false);
        }}
        onClick={onClick}
      />
    </ImageWrap>
  );
}

Image.propTypes = {
  className: T.string,
  src: T.string.isRequired,
  alt: T.string.isRequired,
  width: T.string.isRequired,
  height: T.string.isRequired,
  fallback: T.string,
  onClick: T.func,
  isRemote: T.bool,
  loader: T.oneOf(["skeleton", "spinner"]),
};

export default Image;
