import { axios } from '@/utils/request';

export const downloadFile = async (url, filename) => {
  const response = await axios({
    url: url,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      responseType: 'blob',
    },
  });

  const blob = new Blob([response.data]);
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(blobUrl);
};

// downloadFile('https://example.com/myfile.pdf', 'myfile.pdf');
