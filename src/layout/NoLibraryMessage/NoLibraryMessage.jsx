import React from 'react';
import {
  MessageContainer,
  WelcomeMessage,
  Instruction,
} from './NoLibraryMessage.style';
import { Button } from '../../common/Button';

const NoLibraryMessage = ({ chooseDirectory }) => {
  return (
    <MessageContainer>
      <WelcomeMessage>Welcome to Musica</WelcomeMessage>
      <Instruction>Open a directory to start listening to songs</Instruction>
      <Button onClick={chooseDirectory}>Choose Directory</Button>
    </MessageContainer>
  );
};

export default NoLibraryMessage;
