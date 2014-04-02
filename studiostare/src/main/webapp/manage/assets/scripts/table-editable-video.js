var TableEditable = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable_client, nRow) {
                var aData = oTable_client.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable_client.fnUpdate(aData[i], nRow, i, false);
                }

                oTable_client.fnDraw();
            }
            
            function restoreRow_category(oTable_category, nRow) {
                var aData = oTable_category.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable_category.fnUpdate(aData[i], nRow, i, false);
                }

                oTable_category.fnDraw();
            }

            function editRow(oTable_client, nRow) {
                var aData = oTable_client.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<a class="edit" href="">Save</a>';
                jqTds[5].innerHTML = '<a class="cancel" href="">Cancel</a>';
            }
            
            function editRow_category(oTable_category, nRow) {
                var aData = oTable_category.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<a class="edit" href="">Save</a>';
                jqTds[3].innerHTML = '<a class="cancel" href="">Cancel</a>';
            }

            function saveRow(oTable_client, nRow) {
                var jqInputs = $('input', nRow);
                oTable_client.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable_client.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable_client.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable_client.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable_client.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
                oTable_client.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 5, false);
                oTable_client.fnDraw();
            }
            
            function saveRow_category(oTable_category, nRow) {
                var jqInputs = $('input', nRow);
                oTable_category.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable_category.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable_category.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 2, false);
                oTable_category.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 3, false);
                oTable_category.fnDraw();
            }

            function cancelEditRow(oTable_client, nRow) {
                var jqInputs = $('input', nRow);
                oTable_client.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable_client.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable_client.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable_client.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable_client.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
                oTable_client.fnDraw();
            }
            
            function cancelEditRow_category(oTable_category, nRow) {
                var jqInputs = $('input', nRow);
                oTable_category.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable_category.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable_category.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 2, false);
                oTable_category.fnDraw();
            }

            var oTable_client = $('#editable_client').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ]
            });
            
            var oTable_category = $('#editable_category').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ]
            });

            jQuery('#editable_client_wrapper .dataTables_filter input').addClass("form-control input-medium input-inline"); // modify table search input
            jQuery('#editable_client_wrapper .dataTables_length select').addClass("form-control input-small"); // modify table per page dropdown
            jQuery('#editable_client_wrapper .dataTables_length select').select2({
                showSearchInput : false //hide search box with special css class
            }); // initialize select2 dropdown
            
            jQuery('#editable_category_wrapper .dataTables_filter input').addClass("form-control input-medium input-inline"); // modify table search input
            jQuery('#editable_category_wrapper .dataTables_length select').addClass("form-control input-small"); // modify table per page dropdown
            jQuery('#editable_category_wrapper .dataTables_length select').select2({
                showSearchInput : false //hide search box with special css class
            }); // initialize select2 dropdown

            var nEditing = null;

            $('#editable_client_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable_client.fnAddData(['', '', '', '',
                        '<a class="edit" href="">Edit</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable_client.fnGetNodes(aiNew[0]);
                editRow(oTable_client, nRow);
                nEditing = nRow;
            });
            
            $('#editable_category_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable_category.fnAddData(['', '', '', '',
                        '<a class="edit" href="">Edit</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable_category.fnGetNodes(aiNew[0]);
                editRow_category(oTable_category, nRow);
                nEditing = nRow;
            });

            $('#editable_client a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable_client.fnDeleteRow(nRow);
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            
            $('#editable_category a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable_category.fnDeleteRow(nRow);
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });

            $('#editable_client a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable_client.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable_client, nEditing);
                    nEditing = null;
                }
            });
            
            $('#editable_category a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable_category.fnDeleteRow(nRow);
                } else {
                    restoreRow_category(oTable_category, nEditing);
                    nEditing = null;
                }
            });

            $('#editable_client a.edit').live('click', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable_client, nEditing);
                    editRow(oTable_client, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */
                    saveRow(oTable_client, nEditing);
                    nEditing = null;
                    alert("Updated! Do not forget to do some ajax to sync with backend :)");
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable_client, nRow);
                    nEditing = nRow;
                }
            });
            
            $('#editable_category a.edit').live('click', function (e) {
                e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow_category(oTable_category, nEditing);
                    editRow_category(oTable_category, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */
                    saveRow_category(oTable_category, nEditing);
                    nEditing = null;
                    alert("Updated! Do not forget to do some ajax to sync with backend :)");
                } else {
                    /* No edit in progress - let's start one */
                    editRow_category(oTable_category, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();