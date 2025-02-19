import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Link from 'next/link';

const ColoredButton = ({ text, link }: any) => {
  return (
    <Link
      href={link}
      className="block cursor-pointer items-center rounded-sm border border-solid border-indigo-500 bg-indigo-600 px-4 py-3 text-center font-bold text-white transition duration-100 ease-in-out hover:bg-indigo-700"
    >
      {text}
    </Link>
  );
};

export default ColoredButton;

export function ColoredSubmitButton({ text, submit }: any) {
  return (
    <button
      onSubmit={submit}
      className="block w-full cursor-pointer items-center rounded-sm border border-solid border-indigo-500 bg-indigo-600 px-4 py-3 text-center font-bold text-white transition duration-100 ease-in-out hover:bg-indigo-700"
    >
      {text}
    </button>
  );
}

export function UnColoredButton({ text, link }: any) {
  return (
    <Link
      href={link}
      className="text-secondary block cursor-pointer items-center rounded-sm border border-solid border-indigo-700 px-4 py-3 text-center font-bold transition duration-100 ease-in-out hover:bg-indigo-600 hover:text-white"
    >
      {text}
    </Link>
  );
}

export function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <button onClick={handleClick} className="pt-2 font-bold text-white">
        <KeyboardDoubleArrowUpIcon />
      </button>
    </div>
  );
}
