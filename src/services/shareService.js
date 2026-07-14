export async function shareVideoLink(video) {
  const shareData = { title: video.title, text: video.description, url: window.location.href };
  if (navigator.share && navigator.canShare?.(shareData)) {
    await navigator.share(shareData);
    return 'native';
  }
  await navigator.clipboard.writeText(`${video.title} - ${window.location.href}`);
  return 'clipboard';
}
