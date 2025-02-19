import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';
import { useTranslation } from 'react-i18next';

const DownloadButton = ({ fileName, fileUrl }: any) => {
  const { t } = useTranslation('dashboard');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex cursor-pointer items-center rounded-sm border border-solid bg-indigo-600 py-1 px-3 text-center text-xs font-bold text-white transition duration-100 ease-in-out hover:bg-indigo-700"
    >
      <DownloadIcon sx={{ mr: 1 }} /> {t('download')}
    </button>
  );
};

export default DownloadButton;
