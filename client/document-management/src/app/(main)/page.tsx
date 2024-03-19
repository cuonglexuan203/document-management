'use client'
import { useAppDispatch, useAppSelector } from "./_store/hooks"
import { RootState } from "./_store/store"
import { useGetDocumentsQuery } from "./_store/services/documentApi"
import { showLoading, hideLoading } from "./_store/features/statusSlide"

const Home = () => {
    const {
        isLoading,
        isFetching,
        isSuccess,
        data: documents = [],
        error
    } = useGetDocumentsQuery(null);
    const dispatch = useAppDispatch();
    if (isLoading || isFetching) {
        dispatch(showLoading());
    }
    if (isSuccess) {
        setInterval(() => dispatch(hideLoading(), 500));
    }
    return (
        <main>
            <ol>
                {documents.map(doc => (<li key={doc.id}>
                    <ul className="my-8">
                        <li className="my-4 text-gray-500">Title: {doc.title}</li>
                        <li>Version: {doc.version}</li>
                        <li>Description: {doc.description}</li>
                        <li>Added Time: {doc.addedTime}</li>
                    </ul>
                </li>))}

            </ol>
        </main>
    )
}

export default Home