/**
* Theme: Montran Admin Template
* Author: Coderthemes
* Component: Editable
*
*/

(function( $ ) {

	'use strict';


	var actions = [
		'<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
		'<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
		'<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
		'<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
	].join(' ');

	var rowSetActionsEditing = function( $row ) {
		$row.find( '.on-editing' ).removeClass( 'hidden' );
		$row.find( '.on-default' ).addClass( 'hidden' );
	};

	var rowSetActionsDefault = function( $row ) {
		$row.find( '.on-editing' ).addClass( 'hidden' );
		$row.find( '.on-default' ).removeClass( 'hidden' );
	};

	var rowRemove = function( $row, $this ) {
		if ( $row.hasClass('adding') ) {
			$this.$addButton.removeAttr( 'disabled' );
		}

		$this.datatable.row( $row.get(0) ).remove().draw();
	};

	var rowCancel = function( $row, $this ) {
		var $actions,
			data;

		if ( $row.hasClass('adding') ) {
			rowRemove( $row, $this );
		} else {

			data = $this.datatable.row( $row.get(0) ).data();
			$this.datatable.row( $row.get(0) ).data( data );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			$this.datatable.draw();
		}
	};


	var eventSetup = function(_self) {
		_self.$table
			.on('click', 'a.save-row', function( e ) {
				e.preventDefault();
				_self.rowSave( $(this).closest( 'tr' ) );
			})
			.on('click', 'a.cancel-row', function( e ) {
				e.preventDefault();
				rowCancel( $(this).closest( 'tr' ), _self );
			})
			.on('click', 'a.edit-row', function( e ) {
				e.preventDefault();
				_self.rowEdit( $(this).closest( 'tr' ) );
			})
			.on( 'click', 'a.remove-row', function( e ) {
				e.preventDefault();

				var $row = $(this).closest( 'tr' );
				$.magnificPopup.open({
					items: {
						src: _self.options.dialog.wrapper,
						type: 'inline'
					},
					preloader: false,
					modal: true,
					callbacks: {
						change: function() {
							_self.dialog.$confirm.on( 'click', function( e ) {
								e.preventDefault();

								rowRemove( $row, _self );
								$.magnificPopup.close();
							});
						},
						close: function() {
							_self.dialog.$confirm.off( 'click' );
						}
					}
				});
			});

		_self.$addButton.on( 'click', function(e) {
			e.preventDefault();
			_self.rowAdd();
		});

		_self.dialog.$cancel.on( 'click', function( e ) {
			e.preventDefault();
			$.magnificPopup.close();
		});
		return _self;
	};

	var setVarsSetup = function(_self) {
		_self.$table				= $( _self.options.table );
		_self.$addButton			= $( _self.options.addButton );

		// dialog
		_self.dialog				= {};
		_self.dialog.$wrapper	= $( _self.options.dialog.wrapper );
		_self.dialog.$cancel		= $( _self.options.dialog.cancelButton );
		_self.dialog.$confirm	= $( _self.options.dialog.confirmButton );

		return _self;
	};


	var EditableTable = {

		options: {
			addButton: '#addToTable',
			table: '#datatable-editable',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm'
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			return setVarsSetup(this);
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			return eventSetup(_self);
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var data,
				$row;

			data = this.datatable.row.add([ '', '', '','', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowEdit: function( $row ) {
			var data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					rowSetActionsEditing( $row );
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			this.datatable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		}

	};
	EditableTable.initialize();

	var GeneralEquityTable = {

		options: {
			addButton: '#add-to-general-equity',
			table: '#datatable-general-equity',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm'
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			return setVarsSetup(this);
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			return eventSetup(_self);
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var data,
				$row;

			data = this.datatable.row.add([ '', '','', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowEdit: function( $row ) {
			var data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					rowSetActionsEditing( $row );
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			this.datatable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		}

	};


	var PresalesTable = {

		options: {
			addButton: '#add-to-presales',
			table: '#datatable-presales',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm'
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			return setVarsSetup(this);
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			return eventSetup(_self);
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var data,
				$row;

			data = this.datatable.row.add([ '', '', '', '', '', '', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowEdit: function( $row ) {
			var data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					rowSetActionsEditing( $row );
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			this.datatable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		}

	};

//Senior Debt Table

var SeniorDebtTable = {

	options: {
		addButton: '#add-to-senior-debt-table',
		table: '#datatable-senior-debt-table',
		dialog: {
			wrapper: '#dialog',
			cancelButton: '#dialogCancel',
			confirmButton: '#dialogConfirm'
		}
	},

	initialize: function() {
		this
			.setVars()
			.build()
			.events();
	},

	setVars: function() {
		return setVarsSetup(this);
	},

	build: function() {
		this.datatable = this.$table.DataTable({
			aoColumns: [
				null,
				null,
				null,
				{ className: "equity-type"},
				{ className: "financing-source"},
				null,
				{ className: "loan-type"},
				{ "bSortable": false }
			]
		});

		window.dt = this.datatable;

		return this;
	},

	events: function() {
		var _self = this;

		return eventSetup(_self);
	},
	// ==========================================================================================
	// ROW FUNCTIONS
	// ==========================================================================================
	rowAdd: function() {
		this.$addButton.attr({ 'disabled': 'disabled' });

		var data,
			$row;

		data = this.datatable.row.add([ '', '', '','', '','','',actions ]);
		$row = this.datatable.row( data[0] ).nodes().to$();

		$row
			.addClass( 'adding' )
			.find( 'td:last' )
			.addClass( 'actions' );

		this.rowEdit( $row );

		this.datatable.order([0,'asc']).draw(); // always show fields
	},

	rowEdit: function( $row ) {
		var data = this.datatable.row( $row.get(0) ).data();

		$row.children( 'td' ).each(function( i ) {
			var $this = $( this );

			if ( $this.hasClass('actions') ) {
				rowSetActionsEditing( $row );
			} else if ( $this.hasClass('equity-type')){
			  $this.html( '<select class="form-control" id="equity-type-dropdown"><option value="Gross Equity">Gross</option><option value="Net Equity">Net</option>'+
				'</select>');
				if (data[i].length > 0){
				  $('#equity-type-dropdown').val(data[i]);
				}
			} else if ( $this.hasClass('loan-type')){
				$this.html( '<select class="form-control" id="loan-type-dropdown"><option value="Simple">Simple</option><option value="Semi-Annual">Semi-Annual</option><option value="Annual">Annual</option>'+
				'</select>');
				if (data[i].length > 0){
				  $('#loan-type-dropdown').val(data[i]);
				}
			} else if ( $this.hasClass('financing-source')){
				$this.html( '<select class="form-control" id="financing-source-dropdown"><option value="Revenue">Revenue</option><option value="Budget">Budget</option>'+
				'</select>');
				if (data[i].length > 0){
				  $('#financing-source-dropdown').val(data[i]);
				}
			} else {
				$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
			}
		});
	},

	rowSave: function( $row ) {
		var _self     = this,
			$actions,
			values;

		if ( $row.hasClass( 'adding' ) ) {
			this.$addButton.removeAttr( 'disabled' );
			$row.removeClass( 'adding' );
		}

		values = $row.find('td').map(function() {
			var $this = $(this);

			if ( $this.hasClass('actions') ) {
				rowSetActionsDefault( $row );
				return _self.datatable.cell( this ).data();
			} else if ( $this.hasClass('equity-type')){
			  return $.trim( $this.find('select').val() );
			} else if ( $this.hasClass('loan-type')){
				return $.trim( $this.find('select').val() );
			} else if ( $this.hasClass('financing-source')){
				return $.trim( $this.find('select').val() );
			} else {
				return $.trim( $this.find('input').val() );
			}
		});

		this.datatable.row( $row.get(0) ).data( values );

		$actions = $row.find('td.actions');
		if ( $actions.get(0) ) {
			rowSetActionsDefault( $row );
		}

		this.datatable.draw();
	}

};

//Preferred Equity Table

var PreferredEquityTable = {

	options: {
		addButton: '#add-to-preferred-equity-table',
		table: '#datatable-preferred-equity-table',
		dialog: {
			wrapper: '#dialog',
			cancelButton: '#dialogCancel',
			confirmButton: '#dialogConfirm'
		}
	},

	initialize: function() {
		this
			.setVars()
			.build()
			.events();
	},

	setVars: function() {
		return setVarsSetup(this)
	},

	build: function() {
		this.datatable = this.$table.DataTable({
			aoColumns: [
				null,
				null,
				null,
				{ "bSortable": false }
			]
		});

		window.dt = this.datatable;

		return this;
	},

	events: function() {
		var _self = this;

		return eventSetup(_self);
	},
	// ==========================================================================================
	// ROW FUNCTIONS
	// ==========================================================================================
	rowAdd: function() {
		this.$addButton.attr({ 'disabled': 'disabled' });

		var data,
			$row;

		data = this.datatable.row.add([ '',  '','', actions ]);
		$row = this.datatable.row( data[0] ).nodes().to$();

		$row
			.addClass( 'adding' )
			.find( 'td:last' )
			.addClass( 'actions' );

		this.rowEdit( $row );
		this.datatable.order([0,'asc']).draw(); // always show fields
	},


	rowEdit: function( $row ) {
		var data = this.datatable.row( $row.get(0) ).data();

		$row.children( 'td' ).each(function( i ) {
			var $this = $( this );

			if ( $this.hasClass('actions') ) {
				rowSetActionsEditing( $row );
			} else {
				$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
			}
		});
	},

	rowSave: function( $row ) {
		var _self     = this,
			$actions,
			values;

		if ( $row.hasClass( 'adding' ) ) {
			this.$addButton.removeAttr( 'disabled' );
			$row.removeClass( 'adding' );
		}

		values = $row.find('td').map(function() {
			var $this = $(this);

			if ( $this.hasClass('actions') ) {
				rowSetActionsDefault( $row );
				return _self.datatable.cell( this ).data();
			} else {
				return $.trim( $this.find('input').val() );
			}
		});

		this.datatable.row( $row.get(0) ).data( values );

		$actions = $row.find('td.actions');
		if ( $actions.get(0) ) {
			rowSetActionsDefault( $row );
		}

		this.datatable.draw();
	}

};

//Non_Recouping Production Capital Table

var NonRecoupingTable = {

	options: {
		addButton: '#add-to-non-recouping-table',
		table: '#datatable-non-recouping-table',
		dialog: {
			wrapper: '#dialog',
			cancelButton: '#dialogCancel',
			confirmButton: '#dialogConfirm'
		}
	},

	initialize: function() {
		this
			.setVars()
			.build()
			.events();
	},

	setVars: function() {
		return setVarsSetup(this);
	},

	build: function() {
		this.datatable = this.$table.DataTable({
			aoColumns: [
				null,
				null,
				null,
				{ "bSortable": false }
			]
		});

		window.dt = this.datatable;

		return this;
	},

	events: function() {
		var _self = this;

		return eventSetup(_self);
	},

	// ==========================================================================================
	// ROW FUNCTIONS
	// ==========================================================================================
	rowAdd: function() {
		this.$addButton.attr({ 'disabled': 'disabled' });

		var data,
			$row;

		data = this.datatable.row.add([ '', '','', actions ]);
		$row = this.datatable.row( data[0] ).nodes().to$();

		$row
			.addClass( 'adding' )
			.find( 'td:last' )
			.addClass( 'actions' );

		this.rowEdit( $row );

		this.datatable.order([0,'asc']).draw(); // always show fields
	},

	rowEdit: function( $row ) {
		var data;

		data = this.datatable.row( $row.get(0) ).data();

		$row.children( 'td' ).each(function( i ) {
			var $this = $( this );

			if ( $this.hasClass('actions') ) {
				rowSetActionsEditing( $row );
			} else {
				$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
			}
		});
	},

	rowSave: function( $row ) {
		var _self     = this,
			$actions,
			values;

		if ( $row.hasClass( 'adding' ) ) {
			this.$addButton.removeAttr( 'disabled' );
			$row.removeClass( 'adding' );
		}

		values = $row.find('td').map(function() {
			var $this = $(this);

			if ( $this.hasClass('actions') ) {
				rowSetActionsDefault( $row );
				return _self.datatable.cell( this ).data();
			} else {
				return $.trim( $this.find('input').val() );
			}
		});

		this.datatable.row( $row.get(0) ).data( values );

		$actions = $row.find('td.actions');
		if ( $actions.get(0) ) {
			rowSetActionsDefault( $row );
		}

		this.datatable.draw();
	}

};

//Corridor Equity Table

var CorridorEquityTable = {

	options: {
		addButton: '#add-to-corridor-equity-table',
		table: '#datatable-corridor-equity-table',
		dialog: {
			wrapper: '#dialog',
			cancelButton: '#dialogCancel',
			confirmButton: '#dialogConfirm'
		}
	},

	initialize: function() {
		this
			.setVars()
			.build()
			.events();
	},

	setVars: function() {
		return setVarsSetup(this)
	},

	build: function() {
		this.datatable = this.$table.DataTable({
			aoColumns: [
				null,
				null,
				null,
				null,
				null,
				{ "bSortable": false }
			]
		});

		window.dt = this.datatable;

		return this;
	},

	events: function() {
		var _self = this;
		return eventSetup(_self);
	},

	// ==========================================================================================
	// ROW FUNCTIONS
	// ==========================================================================================
	rowAdd: function() {
		this.$addButton.attr({ 'disabled': 'disabled' });

		var data,
			$row;

		data = this.datatable.row.add([ '', '', '', '', '', actions ]);
		$row = this.datatable.row( data[0] ).nodes().to$();

		$row
			.addClass( 'adding' )
			.find( 'td:last' )
			.addClass( 'actions' );

		this.rowEdit( $row );

		this.datatable.order([0,'asc']).draw(); // always show fields
	},

	rowEdit: function( $row ) {
		var data;

		data = this.datatable.row( $row.get(0) ).data();

		$row.children( 'td' ).each(function( i ) {
			var $this = $( this );

			if ( $this.hasClass('actions') ) {
				rowSetActionsEditing( $row );
			} else {
				$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
			}
		});
	},

	rowSave: function( $row ) {
		var _self     = this,
			$actions,
			values;

		if ( $row.hasClass( 'adding' ) ) {
			this.$addButton.removeAttr( 'disabled' );
			$row.removeClass( 'adding' );
		}

		values = $row.find('td').map(function() {
			var $this = $(this);

			if ( $this.hasClass('actions') ) {
				rowSetActionsDefault( $row );
				return _self.datatable.cell( this ).data();
			} else {
				return $.trim( $this.find('input').val() );
			}
		});

		this.datatable.row( $row.get(0) ).data( values );

		$actions = $row.find('td.actions');
		if ( $actions.get(0) ) {
			rowSetActionsDefault( $row );
		}

		this.datatable.draw();
	}

};

// Direct Territory Sales Table

var DirectTerritorySalesTable = {

	options: {
		addButton: '#add-to-direct-territory-sales-table',
		table: '#datatable-direct-territory-sales-table',
		dialog: {
			wrapper: '#dialog',
			cancelButton: '#dialogCancel',
			confirmButton: '#dialogConfirm'
		}
	},

	initialize: function() {
		this
			.setVars()
			.build()
			.events();
	},

	setVars: function() {
		return setVarsSetup(this)
	},

	build: function() {
		this.datatable = this.$table.DataTable({
			aoColumns: [
				null,
				null,
				{ className: "territory-type"},
				null,
				null,
				null,
				{ className: "loan-type"},
				{ "bSortable": false }
			]
		});

		window.dt = this.datatable;

		return this;
	},

	events: function() {
		var _self = this;

		return eventSetup(_self);
	},

	// ==========================================================================================
	// ROW FUNCTIONS
	// ==========================================================================================
	rowAdd: function() {
		this.$addButton.attr({ 'disabled': 'disabled' });

		var data,
			$row;

		data = this.datatable.row.add([ '', '', '', '', '','','', actions ]);
		$row = this.datatable.row( data[0] ).nodes().to$();

		$row
			.addClass( 'adding' )
			.find( 'td:last' )
			.addClass( 'actions' );

		this.rowEdit( $row );

		this.datatable.order([0,'asc']).draw(); // always show fields
	},

	rowEdit: function( $row ) {
		var data;

		data = this.datatable.row( $row.get(0) ).data();

		$row.children( 'td' ).each(function( i ) {
			var $this = $( this );

			if ( $this.hasClass('actions') ) {
				rowSetActionsEditing( $row );
			} else if ( $this.hasClass('territory-type')){
			  $this.html( '<select class="form-control" id="territory-type-dropdown">'+
				'<option value="Airlines">Airlines</option>' +
				'<option value="Argentina">Argentina</option>' +
				'<option value="Asia PTV">Asia PTV</option>' +
				'<option value="Australia">Australia</option>' +
				'<option value="Austria">Austria</option>' +
				'<option value="Baltics">Baltics</option>' +
				'<option value="Benelux">Benelux</option>' +
				'<option value="Brazil">Brazil</option>' +
				'<option value="Bolivia">Bolivia</option>' +
				'<option value="Bulgaria">Bulgaria</option>' +
				'<option value="Canada">Canada</option>' +
				'<option value="Central America">Central America</option>' +
				'<option value="Columbia">Columbia</option>' +
				'<option value="China">China</option>' +
				'<option value="CIS">CIS</option>' +
				'<option value="Cyprus">Cyprus</option>' +
				'<option value="Croatia">Croatia</option>' +
				'<option value="Czech Republic">Czech Republic</option>' +
				'<option value="Ecuador">Ecuador</option>' +
				'<option value="Former Yugoslavia">Former Yugoslavia</option>' +
				'<option value="France">France</option>' +
				'<option value="Germany">Germany</option>' +
				'<option value="Greece">Greece</option>' +
				'<option value="Hong Kong">Hong Kong</option>' +
				'<option value="Hungary">Hungary</option>' +
				'<option value="Iceland">Iceland</option>' +
				'<option value="Ireland">Ireland</option>' +
				'<option value="India">India</option>' +
				'<option value="Indonesia">Indonesia</option>' +
				'<option value="Israel">Israel</option>' +
				'<option value="Italy">Italy</option>' +
				'<option value="Japan">Japan</option>' +
				'<option value="Macao">Macao</option>' +
				'<option value="Malaysia">Malaysia</option>' +
				'<option value="Mexico">Mexico</option>' +
				'<option value="Middle East">Middle East</option>' +
				'<option value="New Zealand">New Zealand</option>' +
				'<option value="Pakistan">Pakistan</option>' +
				'<option value="Paraguay">Paraguay</option>' +
				'<option value="Pan Asian Sat TV">Pan Asian Sat TV</option>' +
				'<option value="Pan Latin PTV">Pan Latin PTV</option>' +
				'<option value="Peru">Peru</option>' +
				'<option value="Philippines">Philippines</option>' +
				'<option value="Poland">Poland</option>' +
				'<option value="Portugal">Portugal</option>' +
				'<option value="Romania">Romania</option>' +
				'<option value="Russia">Russia</option>' +
				'<option value="Scandinavia">Scandinavia</option>' +
				'<option value="Serbia">Serbia</option>' +
				'<option value="Singapore">Singapore</option>' +
				'<option value="Slovakia">Slovakia</option>' +
				'<option value="South Africa">South Africa</option>' +
				'<option value="South Korea">South Korea</option>' +
				'<option value="Spain">Spain</option>' +
				'<option value="Sri Lanka">Sri Lanka</option>' +
				'<option value="Switzerland">Switzerland</option>' +
				'<option value="Taiwan">Taiwan</option>' +
				'<option value="Thailand">Thailand</option>' +
				'<option value="Turkey">Turkey</option>' +
				'<option value="United Kingdom">United Kingdom</option>' +
				'<option value="Uruguay">Uruguay</option>' +
				'<option value="USA">USA</option>' +
				'<option value="Venezuela">Venezuela</option>' +
				'</select>');
				if (data[i].length > 0){
				  $('#territory-type-dropdown').val(data[i]);
				}
			} else if ( $this.hasClass('loan-type')){
				$this.html( '<select class="form-control" id="loan-type-dropdown"><option value="Simple">Simple</option><option value="Semi-Annual">Semi-Annual</option><option value="Annual">Annual</option>'+
					'</select>');
				if (data[i].length > 0){
					$('#loan-type-dropdown').val(data[i]);
				}
			} else {
				$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
			}
		});
	},

	rowSave: function( $row ) {
		var _self     = this,
			$actions,
			values;

		if ( $row.hasClass( 'adding' ) ) {
			this.$addButton.removeAttr( 'disabled' );
			$row.removeClass( 'adding' );
		}

		values = $row.find('td').map(function() {
			var $this = $(this);

			if ( $this.hasClass('actions') ) {
				rowSetActionsDefault( $row );
				return _self.datatable.cell( this ).data();
			} else if ( $this.hasClass('territory-type')){
			  return $.trim( $this.find('select').val() );
			} else if ( $this.hasClass('loan-type')){
				return $.trim( $this.find('select').val() );
			} else {
				return $.trim( $this.find('input').val() );
			}
		});

		this.datatable.row( $row.get(0) ).data( values );

		$actions = $row.find('td.actions');
		if ( $actions.get(0) ) {
			rowSetActionsDefault( $row );
		}

		this.datatable.draw();
	}

};

	var TaxGrantLoanTable= {

		options: {
			addButton: '#add-to-tax-table-loan',
			table: '#datatable-tax-table-loan',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm'
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			return setVarsSetup(this);
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					{ className: "loan-type"},
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			return eventSetup(_self);
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var data,
				$row;

			data = this.datatable.row.add([ '', '', '','', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowCancel: function( $row ) {
			var _self = this,
				$actions,
				data;

			if ( $row.hasClass('adding') ) {
				rowRemove( $row, _self );
			} else {

				data = this.datatable.row( $row.get(0) ).data();
				this.datatable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					rowSetActionsDefault( $row );
				}

				this.datatable.draw();
			}
		},

		rowEdit: function( $row ) {
			var data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					rowSetActionsEditing( $row );
				} else if ( $this.hasClass('loan-type')){
					$this.html( '<select class="form-control" id="tax-grant-loan-type-dropdown"><option value="Simple">Simple</option><option value="Semi-Annual">Semi-Annual</option><option value="Annual">Annual</option>'+
						'</select>');
					if (data[i].length > 0){
						$('#tax-grant-loan-type-dropdown').val(data[i]);
					}
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else if ( $this.hasClass('loan-type')){
					return $.trim( $this.find('select').val() );
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			this.datatable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		}

	};

	var TaxGrantDiscountTable = {

		options: {
			addButton: '#add-to-tax-table-discount',
			table: '#datatable-tax-table-discount',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm'
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			return setVarsSetup(this);
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			return eventSetup(_self);
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var data,
				$row;

			data = this.datatable.row.add([ '', '','', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowCancel: function( $row ) {
			var _self = this,
				$actions,
				data;

			if ( $row.hasClass('adding') ) {
				rowRemove( $row, _self );
			} else {

				data = this.datatable.row( $row.get(0) ).data();
				this.datatable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					rowSetActionsDefault( $row );
				}

				this.datatable.draw();
			}
		},

		rowEdit: function( $row ) {
			var data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					rowSetActionsEditing( $row );
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			this.datatable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		}

	};
//Foreign Sales Table
	var ForeignSalesTable= {

		options: {
			addButton: '#add-to-foreign-sales-table',
			table: '#datatable-foreign-sales-table',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm'
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			return setVarsSetup(this);
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			return eventSetup(_self);
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var data,
				$row;

			data = this.datatable.row.add([ '', '', '','', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowCancel: function( $row ) {
			var _self = this,
				$actions,
				data;

			if ( $row.hasClass('adding') ) {
				rowRemove( $row, _self );
			} else {

				data = this.datatable.row( $row.get(0) ).data();
				this.datatable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					rowSetActionsDefault( $row );
				}

				this.datatable.draw();
			}
		},

		rowEdit: function( $row ) {
			var data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					rowSetActionsEditing( $row );
				} else if ( $this.hasClass('loan-type')){
					$this.html( '<select class="form-control" id="tax-grant-loan-type-dropdown"><option value="Simple">Simple</option><option value="Semi-Annual">Semi-Annual</option><option value="Annual">Annual</option>'+
						'</select>');
					if (data[i].length > 0){
						$('#tax-grant-loan-type-dropdown').val(data[i]);
					}
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else if ( $this.hasClass('loan-type')){
					return $.trim( $this.find('select').val() );
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			this.datatable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		}

	};

	var TaxGrantDiscountTable = {

		options: {
			addButton: '#add-to-tax-table-discount',
			table: '#datatable-tax-table-discount',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm'
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			return setVarsSetup(this);
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				aoColumns: [
					null,
					null,
					null,
					{ "bSortable": false }
				]
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			return eventSetup(_self);
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		rowAdd: function() {
			this.$addButton.attr({ 'disabled': 'disabled' });

			var data,
				$row;

			data = this.datatable.row.add([ '', '','', actions ]);
			$row = this.datatable.row( data[0] ).nodes().to$();

			$row
				.addClass( 'adding' )
				.find( 'td:last' )
				.addClass( 'actions' );

			this.rowEdit( $row );
			this.datatable.order([0,'asc']).draw(); // always show fields
		},

		rowCancel: function( $row ) {
			var _self = this,
				$actions,
				data;

			if ( $row.hasClass('adding') ) {
				rowRemove( $row, _self );
			} else {

				data = this.datatable.row( $row.get(0) ).data();
				this.datatable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					rowSetActionsDefault( $row );
				}

				this.datatable.draw();
			}
		},

		rowEdit: function( $row ) {
			var data = this.datatable.row( $row.get(0) ).data();

			$row.children( 'td' ).each(function( i ) {
				var $this = $( this );

				if ( $this.hasClass('actions') ) {
					rowSetActionsEditing( $row );
				} else {
					$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
				}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values;

			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
			}

			values = $row.find('td').map(function() {
				var $this = $(this);

				if ( $this.hasClass('actions') ) {
					rowSetActionsDefault( $row );
					return _self.datatable.cell( this ).data();
				} else {
					return $.trim( $this.find('input').val() );
				}
			});

			this.datatable.row( $row.get(0) ).data( values );

			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				rowSetActionsDefault( $row );
			}

			this.datatable.draw();
		}

	};

	PreferredEquityTable.initialize();
	SeniorDebtTable.initialize();
	GeneralEquityTable.initialize();
	PresalesTable.initialize();
	DirectTerritorySalesTable.initialize();
	CorridorEquityTable.initialize();
	TaxGrantLoanTable.initialize();
	TaxGrantDiscountTable.initialize();
	NonRecoupingTable.initialize();
	ForeignSalesTable.initialize();


}).apply(this, [ jQuery ]);
