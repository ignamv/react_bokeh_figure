
var Bokeh;

// Load javascript, return Promise
function loadScript(src) { return new Promise((resolve, fail) => {
  const tag = document.createElement('script');
  tag.onload = resolve;
  tag.onerror = fail;
  tag.src = src;
  document.body.appendChild(tag);
})}

// Load css, return Promise
function loadStyle(src) { return new Promise((resolve, fail) => {
  const tag = document.createElement('link');
	tag.rel = 'stylesheet';
  tag.onload = resolve;
  tag.onerror = fail;
  tag.href = src;
  document.body.appendChild(tag);
})}

async function loadBokeh(minified=true) {
  const suffix = minified ? '.min' : '';
  const base = 'http://cdn.pydata.org/bokeh/release/bokeh';
  const version = '-0.12.10'
  const url = (sub, ext) => `${base}${sub}${version}${suffix}.${ext}`;
  await loadStyle(url('', 'css'));
  await loadStyle(url('-tables', 'css'));
  await loadScript(url('', 'js'));
  await loadScript(url('-tables', 'js'));
  await loadScript(url('-api', 'js'));
  return window.Bokeh;
}

const minified = process.env.NODE_ENV === 'production';
const bokehLoaded = loadBokeh(minified)
.then((bokeh) => Bokeh=bokeh)
.catch(console.log);

export { Bokeh, bokehLoaded };
