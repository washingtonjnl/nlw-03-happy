import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Main = styled.main`
  flex: 1;
  margin-left: 96px;
`;

export const Form = styled.form`
  width: 700px;
  margin: 64px auto;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  padding: 64px 80px;

  overflow: hidden;

  .leaflet-container {
    border: 1px solid #dde3f0;
    border-radius: 20px;
  }
`;

export const Fieldset = styled.fieldset`
  border: 0;

  & + & {
    margin-top: 80px;
  }

  legend {
    width: 100%;

    font-size: 32px;
    line-height: 34px;
    color: #5c8599;
    font-weight: 700;

    border-bottom: 1px solid #d3e2e5;
    margin-bottom: 40px;
    padding-bottom: 24px;
  }
`;

export const InputBlock = styled.div`
  & + & {
    margin-top: 24px;
  }

  &.first {
    margin-top: 40px;
  }

  label {
    color: #8fa7b3;
    margin-bottom: 8px;
    padding: 0 5px;
    line-height: 24px;

    display: flex;
    justify-content: space-between;

    span {
      font-size: 14px;
      color: #8fa7b3;
      margin-left: 24px;
      line-height: 24px;
    }
  }

  input,
  textarea {
    width: 100%;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    outline: none;
    color: #5c8599;
  }

  input {
    height: 64px;
    padding: 0 16px;
  }

  textarea {
    min-height: 240px;
    max-height: 240px;
    resize: none;
    padding: 16px;
    line-height: 28px;
    overflow: hidden;
  }

  input[type='file'] {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;

  label {
    margin: 0;
  }
`;

export const SelectedImages = styled.div`
  width: 100%;
  height: 96px;
  position: relative;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  img {
    width: 100%;
    height: 96px;
    object-fit: cover;
    border-radius: 20px;
  }

  button {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 0 20px 0 20px;
    border: 1px solid #d3e2e5;

    position: absolute;
    top: -1px;
    right: -1px;

    display: flex;
    justify-content: center;
    align-items: center;

    outline: none;
    cursor: pointer;
    transition: 0.2s;
  }
`;

export const NewImage = styled.label`
  height: 96px;
  background: #f5f8fa;
  border: 1px dashed #96d2f0;
  border-radius: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center !important;
  align-items: center !important;
`;

export const ButtonSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Button = styled.button`
  height: 64px;
  background: #f5f8fa;
  border: 1px solid #d3e2e5;
  color: #5c8599;
  outline: none;
  cursor: pointer;

  &.active {
    background: #edfff6;
    border: 1px solid #a1e9c5;
    color: #37c77f;
  }

  &:first-child {
    border-radius: 20px 0px 0px 20px;
  }

  &:last-child {
    border-radius: 0 20px 20px 0;
    border-left: 0;
  }
`;

export const Submit = styled.button`
  margin-top: 64px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3cdc8c;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  transition: 0.2s;

  svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36cf82;
  }
`;

export const Error = styled.p`
  color: #ff669d;
  margin: 10px 0 0 5px;
  font-size: 16px;
  font-weight: 600;
`;
