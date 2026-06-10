/***************************
@config: {
	storageKey - default: HRVLastViewProducts,
	max - default: 10,
	forever - default: true
}
***************************/
var LastViewProducts = function( config ) {
	var self = this;

	var config = config || {};

	var STORAGE_KEY = config.storageKey || 'HRVLastViewProducts';
	var STORAGE_TYPE = (config.forever || true) ? localStorage : sessionStorage;

	var handles = JSON.parse(STORAGE_TYPE.getItem(STORAGE_KEY)) || [];

	/* Max saved items */
	self.max = config.max || 10;

	/***************************
	@offset - start offset
	@limit - max items can get

	Return: Array
	***************************/
	self.all = function( offset, limit ) {
		var saveHandles = JSON.parse(STORAGE_TYPE.getItem(STORAGE_KEY)) || [];

		offset = offset || 0;
		limit = limit || 0;

		if(offset >= 0 && limit > 0) {
			saveHandles = saveHandles.slice(offset, limit);

			return getProducts(saveHandles);
		}

		return getProducts(saveHandles);
	};

	/***************************
	Return: Integer
	***************************/
	self.count = function() {
		return handles.length;
	};

	/***************************
	@handle - Product's handle

	Return: Object	
	***************************/
	self.add =  function( handle ) {
		if(self.count() >= self.max) {
			handles.pop();
		}

		var offset = self.find(handle);
		var handleNotExist = offset == -1;

		if(handleNotExist) {
			handles.unshift(handle);

			save();

			return handle;
		}

		return null;
	};

	/***************************
	Return: Object
	***************************/
	self.get = function( handle ) {

		if(!self.exist(handle)) {
			return null;
		}

		return getProduct(handle);
	};

	/***************************
	@handle - Product's handle

	Return: Integer	
	***************************/	
	self.find = function( handle ) {
		return handles.indexOf(handle);
	};

	/***************************
	@handle - Product's handle

	Return: Boolean	
	***************************/
	self.exist = function( handle ) {
		return self.find(handle) != -1;
	};

	/***************************
	@offset

	Return: Object
	***************************/	
	self.getByOffset = function( offset ) {		
		var handle = handles[offset];

		return self.get(handle);
	};	

	/***************************
	@handle - Product's handle

	Return: Boolean	
	***************************/
	self.remove = function( handle ) {
		var offset = self.find(handle);

		if(self.exist(handle)) {
			handles.splice(offset, 1);

			save();

			return true;
		}

		return false;
	};

	/***************************
	Return: Boolean	
	***************************/
	self.clear = function() {
		handles = [];

		save();

		return true;
	};

	//Util functions

	function getProduct( handle ) {
		if(!handle) {
			return null;
		}

		var product = null;

		jQuery.ajax({
			type: 'GET',
			url: '/products/' + handle + '.json',
			async: false,
			contentType: 'application/json',
			success: function( data ) {
				product = data.product;
			}
		});

		return product;
	}

	function getProducts( handles ) {
		var products = [];
		var offset = 0;

		while(offset < handles.length) {
			var handle = handles[offset];
			var product = getProduct(handle);

			if(product) {
				products.push(product);
			}

			offset++;
		}

		return products;
	}

	function save() {
		STORAGE_TYPE.setItem(STORAGE_KEY, JSON.stringify(handles));
	}

}




