@extends('main')

@section('content')


    <div class="content-wrapper">
        @foreach(Session::get('user') as $user)
        @endforeach
        <section class="content">
            <div class="box">
                <div class="box-header text-center">
                    <div class="col-md-4" role="alert">
                        @if(in_array($user->user_authorization, array("ADMINISTRATOR", "USER LEVEL I", "1", "2")))
                        <br>
                        <a href="{{ route('OfficialReceipt.create') }}" class="btn btn-block btn-primary btn-flat addCustomer pull-right"> Add Collection Receipt</a>
                        @endif
                    </div>
                </div>
                <div class="box-body table-responsive">
                    <table id="delivery" class="table table-bordered table-striped">
                        <thead>
                        <th class="text-center"> CR No. </th>
                        <th class="text-center"> CR Date. </th>
                        <th class="text-center"> Customer Name </th>
                        @if(in_array($user->user_authorization, array("ADMINISTRATOR", "USER LEVEL I","USER LEVEL II", "1", "2" ,"3")))
                            <th class="text-center"> Actions </th>
                        @endif
                        </thead>
                        <tbody class="text-center">
                        {{--@foreach($OR as $DATA)
                            <tr class="text-center">
                                <td> {{ $DATA -> OR_NO }}</td>
                                <td> {{ $DATA -> OR_DATE }}</td>
                                <td> {{ $DATA -> NAME }}</td>
                                @if($user -> user_authorization == "ADMINISTRATOR" || $user->user_authorization == 1)
                                <td>
                                    <a type="button" class="btn btn-info" href="{{ route('OfficialReceipt.edit', $DATA->ID) }}"><span class="fa fa-pencil">&nbsp;&nbsp;</span>Edit</a>
                                </td>
                                @endif
                            </tr>
                        @endforeach--}}
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- /.row -->
        </section>
    </div>

@endsection

@section('scripts')
    <script>
        $(document).ready(function(){
            var table = $('#delivery').DataTable({
                processing: true,
                serverSide: true,
                bjQueryUI: true,
                ajax : {
                    url : "{{ route('official_receipt_data') }}",
                    type : "GET",
                    dataType: 'JSON'
                },
                columns: [
                    {data: 'OR_NO', name: 'a.OR_NO'},
                    {data: 'OR_DATE', name: 'a.OR_DATE'},
                    {data: 'NAME', name: 'b.NAME'},
                        @if(in_array($user->user_authorization, array("ADMINISTRATOR", "USER LEVEL I","USER LEVEL II", "1", "2" ,"3")))
                    {
                        data: 'action',
                        name: 'action',
                        orderable: true,
                        searchable: true
                    },
                    @endif
                ]
            });
        });
    </script>
@endsection