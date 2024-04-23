import React from 'react';

interface OptionProps {
  theme: 'dark' | 'light';
  type: 'offense' | 'defense';
  children?: React.ReactNode;
  className: string;
  onClick: () => void;
}

const Option = ({ theme, type, children, onClick }: OptionProps) => {
  const onClickStyle = {
    borderBottom: '2px solid var(--color-border)',
    cursor: 'pointer',
    color: 'var(--normal)',
  };

  const ClickStyle = {
    borderBottom:
      type === 'offense' ? '7px solid var(--offenseRec)' : '7px solid var(--defenseRec)',
    cursor: 'pointer',
    color:
      theme === 'dark'
        ? type === 'offense'
          ? 'var(--offenseRec)'
          : 'var(--defenseRec)'
        : 'var(--normal)',
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = event.currentTarget;
    element.style.borderBottom = ClickStyle.borderBottom;
    element.style.color = ClickStyle.color;
    onClick();
  };

  return (
    <div className={`Option ${type}`} style={onClickStyle} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Option;
