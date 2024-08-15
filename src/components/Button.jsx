const Button = ({butonName,className,onClick}) => {
    return (
      <div className="flex justify-end">
      <button onClick={onClick} className={`bg-gray-400 text-black py-2 px-4 rounded hover:bg-gray-700 hover:text-white ${className}`}>
        {butonName}
      </button>
    </div>
    );
  }
  
  export default Button;
  