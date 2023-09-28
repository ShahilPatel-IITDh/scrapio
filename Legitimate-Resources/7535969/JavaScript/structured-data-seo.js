(function () {
  document.querySelectorAll("[data-video]").forEach((videoElement, index) => {
    let container =
      videoElement.closest("[data-component]") ||
      videoElement.closest("[id*='section']");
    let dataUploaded = videoElement.getAttribute("data-uploaded");

    if (
      dataUploaded == null ||
      dataUploaded == "" ||
      container.classList.contains("--video-schema-generated")
    ) {
      return null;
    }

    container.classList.add("--video-schema-generated");

    let titleElement =
      container.querySelector("h2") ||
      container.querySelector("h3") ||
      container.querySelector("h4");

    let descriptionElement = container.querySelector('*[class*="description"]');

    let video = {
      videoId: videoElement.getAttribute("data-video"),
      title: titleElement.innerText,
      description: descriptionElement.innerText,
      link: "",
      thumbnailImg: "",
      uploadDate: dataUploaded,
    };

    if (video.videoId) {
      video.link = `${video.videoId}`;
      video.thumbnailImg = `https://img.youtube.com/vi/${
        video.videoId.split("watch?v=")[1]
      }/hqdefault.jpg`;
    }

    let isEmpty = !Object.values(video).every(
      (value) => value != null && value != ""
    );

    if (!isEmpty) {
      let script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");

      let data = {
        "@context": "https://schema.org/",
        "@type": "VideoObject",
        url: video.link,
        contentUrl: video.link,
        thumbnailUrl: video.thumbnailImg,
        name: video.title,
        description: video.description,
        uploadDate: video.uploadDate,
      };

      script.append(JSON.stringify(data));
      document.head.appendChild(script);
    }
  });
})();
