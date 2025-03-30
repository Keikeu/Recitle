import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Typography from "commons/components/Typography";
import { songs } from "data/songs.const";
import callLocalStorage from "commons/util/callLocalStorage";
import { Link } from "react-router-dom";
import Squares from "./components/Squares";

const Box = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const Container = styled.main`
  width: 680px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 32px;
`;

const SongBox = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
  width: 100%;
  padding: 12px;
  background-color: var(--neutral-100);
  border-radius: var(--border-radius-2);

  &:hover {
    background-color: var(--neutral-80);
  }
`;

function Archive({ className }) {
  const songArchive = callLocalStorage("songArchive");
  console.log(songArchive);

  return (
    <Box className={className}>
      <Container>
        <Typography variant="h1">Archive</Typography>
        <Typography variant="body" marginBottom={24}>
          This page contains a list of all the previous games.
        </Typography>

        {songs.map((song, index) => {
          const archiveItem = songArchive?.[song.id] || {};
          const maxVerses = song.lyricsOriginal.length;

          return (
            <SongBox key={index} to={`/?id=${song.id}`}>
              <Typography variant="h4">#{songs.length - index}</Typography>
              <Typography variant="body">{song.date}</Typography>
              <Squares maxVerses={maxVerses} steps={archiveItem.steps} state={archiveItem.state} />
            </SongBox>
          );
        })}
      </Container>
    </Box>
  );
}

Archive.propTypes = {
  className: T.string,
};

export default Archive;
