'use strict';

// src/services/schedule/hooks/ownership.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports	=	function(options)	{
	return	function(hook)	{
    // The authenticated user
    const	user	=	hook.params.user;
		//	Assign	the	new	data	with the UserId
		hook.data	=	Object.assign({},	hook.data,	{
				userId:	user._id
		});
	};
};
