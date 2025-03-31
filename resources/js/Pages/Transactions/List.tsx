import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function List() {
    return (
        <h1>test</h1>
    );
}

List.layout = (page: JSX.Element) => <Authenticated children={page} title="Transactions" />