import { ServerClient } from 'postmark';

export let postmarkClient;

if (ServerClient === undefined) {
	import('postmark').then(postmark => {
    postmarkClient = new postmark.ServerClient(process.env["POSTMARK_SECRET"]);
	});
} else {
	postmarkClient = new ServerClient(process.env["POSTMARK_SECRET"]);
}
