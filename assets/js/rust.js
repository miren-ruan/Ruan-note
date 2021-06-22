/* TODO
	Add support for Markdown notation inside doc comments
	Add support for nested block comments...
	Match closure params even when not followed by dash or brace
	Add better support for macro definition
*/

Prism.languages.rust = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/,
			lookbehind: true
		}
	],
	'string': [
		/b?r(#*)"(?:\\?.)*?"\1/,
		/b?("|')(?:\\?.)*?\1/
	],
	'keyword': /\b(?:abstract|alignof|as|be|box|break|const|continue|crate|do|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|struct|super|true|trait|type|typeof|unsafe|unsized|use|virtual|where|while|yield)\b/,

	'attribute': {
		pattern: /#!?\[.+?\]/,
		alias: 'attr-name'
	},

	'function': [
		/[a-z0-9_]+(?=\s*\()/i,
		// Macros can use parens or brackets
		/[a-z0-9_]+!(?=\s*\(|\[)/i
	],
	'macro-rules': {
		pattern: /[a-z0-9_]+!/i,
		alias: 'function'
	},

	// Hex, oct, bin, dec numbers with visual separators and type suffix
	'number': /\b-?(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32)?|f32|f64))?\b/,

	// Closure params should not be confused with bitwise OR |
	'closure-params': {
		pattern: /\|[^|]*\|(?=\s*[{-])/,
		inside: {
			'punctuation': /[\|:,]/,
			'operator': /[&*]/
		}
	},
	'punctuation': /[{}[\];(),.:]|->/,
	'operator': /[-+]{1,2}|!=?|<=?|>=?|={1,3}|&&?|\|\|?|\*|\/|\^|%|<<|>>@/
};

Prism.languages.bash = Prism.languages.extend('clike', {
	'comment': {
		pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/,
		lookbehind: true
	},
	'string': {
		//allow multiline string
		pattern: /("|')(\\?[\s\S])*?\1/,
		inside: {
			//'property' class reused for bash variables
			'property': /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/
		}
	},
	// Redefined to prevent highlighting of numbers in filenames
	'number': {
		pattern: /([^\w\.])-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
		lookbehind: true
	},
	// Originally based on http://ss64.com/bash/
	'function': /\b(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|declare|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|echo|egrep|eject|enable|env|ethtool|eval|exec|exit|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|select|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|until|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)\b/,
	'keyword': /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/
});

Prism.languages.insertBefore('bash', 'keyword', {
	//'property' class reused for bash variables
	'property': /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/
});
Prism.languages.insertBefore('bash', 'comment', {
	//shebang must be before comment, 'important' class from css reused
	'important': /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/
});

Prism.languages.toml = {
	'scalar': {
		pattern: /([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:(\n[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,
		lookbehind: true,
		alias: 'string'
	},
	'comment': /#[^\n]+/,
	'key': {
		pattern: /(\s*[:\-,[{\n?][ \t]*(![^\s]+)?[ \t]*)[^\n{[\]},#]+?(?=\s*:\s)/,
		lookbehind: true,
		alias: 'atrule'
	},
	'directive': {
		pattern: /((^|\n)[ \t]*)%[^\n]+/,
		lookbehind: true,
		alias: 'important'
	},
	'datetime': {
		pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*(\n|$|,|]|}))/,
		lookbehind: true,
		alias: 'number'
	},
	'boolean': {
		pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=\n|$|,|]|})/i,
		lookbehind: true,
		alias: 'important'
	},
	'null': {
		pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=\n|$|,|]|})/i,
		lookbehind: true,
		alias: 'important'
	},
	'string': {
		pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')(?=[ \t]*(\n|$|,|]|}))/,
		lookbehind: true
	},
	'number': {
		pattern: /([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\dA-Fa-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=\n|$|,|]|})/i,
		lookbehind: true
	},
	'tag': /![^\s]+/,
	'important': /[&*][\w]+/,
	'punctuation': /([:[\]{}\-,|>?]|---|\.\.\.)/
};

Prism.languages["rust,editable"] = Prism.languages.rust;
Prism.languages["rust,editable,ignore"] = Prism.languages.rust;
Prism.languages["rust,ignore"] = Prism.languages.rust;
Prism.languages["rust,editable,ignore,mdbook-runnable"] = Prism.languages.rust;
Prism.languages["rust,no_run"] = Prism.languages.rust;
Prism.languages["text"] = Prism.languages.bash;
Prism.languages["txt"] = Prism.languages.bash;
Prism.languages["sh"] = Prism.languages.bash;