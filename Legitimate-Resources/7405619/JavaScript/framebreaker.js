//FrameBreaker script - <html> is hidden by default and the displayed by the below script if the page is not framed.
// In the case that the page is framed is breaks the frame.
if (self == top) {
    document.documentElement.style.display = 'block';
} else {
    top.location = self.location;
}