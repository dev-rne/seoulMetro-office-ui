import swr from "swr"

const fetcher = async (url) =>
  fetch(url).then((res) => {
    switch (res.status) {
      case 200:
        return res.json();
      case 404:
        throw new Error("No Users Found");
      default:
        return res.json();
    }
  });

export default function useSWR(url) {
  const { data } = swr(url,() => fetcher(url), {
    revalidateOnFocus: false,
    refreshInterval: 1000 * 60
  });

  return data;
}