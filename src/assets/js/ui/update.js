ipcRenderer.on('update-not-available', async (event, data) => {
	console.log('[Update] Not available');
	console.dir(data);

	document.querySelector('.btn.tab[data-tabid="update"]').style.display = 'none';
	document.querySelector('.btn.tab').click();
});

ipcRenderer.on('update-available', async (event, data) => {
	console.log('[Update] Available! version: ' + data.version);
	console.dir(data);

	document.getElementById('version').innerHTML = `Version ${data.version}`;
	document.getElementById('updateRollout').innerHTML = i18n.__('update-staged-rollout', (data.stagingPercentage || 100) + '%');
	document.getElementById('updateSize').innerHTML = getReadableFileSizeString(data.files[0].size);

	let text = '', changelogs = {};

	for (const note of data.releaseNotes) {
		if (!changelogs[note.version]) changelogs[note.version] = '';
		changelogs[note.version] += note.note.replace(new RegExp('h1', 'g'), 'h3').replace(new RegExp('h2', 'g'), 'h4') + '<br>';
	}

	for (const [version, notes] of Object.entries(changelogs)) {
		text += '<h2>V' + version + '</h2>';
		text += notes;
	}

	document.getElementById('release-notes').innerHTML += text;

	document.getElementById('update').onclick = function(e) {
		ipcRenderer.send('update-download');
		this.disabled = true;
	};

	document.querySelector('.btn.tab[data-tabid="update"]').style.display = '';
});

ipcRenderer.on('update-downloaded', async (event, data) => {
	document.getElementById('update').onclick = () => ipcRenderer.send('update-install');
	document.getElementById('update').innerHTML = i18n.__('ui-menu-update');
	document.getElementById('update').disabled = false;

	document.getElementById('updateProgress').style.display = 'none';
	console.dir(data);
});

ipcRenderer.on('update-progress', async (event, data) => {
	document.getElementById('updateProgress').value = data.percent;
	console.dir(data);
});
