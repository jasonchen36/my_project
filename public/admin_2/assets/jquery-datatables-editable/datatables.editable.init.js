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

}).apply(this, [ jQuery ]);
