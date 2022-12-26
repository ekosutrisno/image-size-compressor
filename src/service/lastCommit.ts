export default async function getGitCommit() {
  const promData = await fetch('https://api.github.com/repos/ekosutrisno/image-size-compressor/commits');
  const res = await promData.json();
  const lastCommit = res[0].sha as string;

  return lastCommit.substring(0, 7);
}
