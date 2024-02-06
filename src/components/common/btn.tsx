interface IButtonProps {
  btnClass: string | undefined;
  name: string | undefined;
  onClick?: any
}

const Button: React.FC<IButtonProps> = ({ btnClass, name,onClick }) => {
  return <button onClick={onClick} className={`btn ${btnClass} color1`} type="button">{name}</button>;
};

export default Button;
