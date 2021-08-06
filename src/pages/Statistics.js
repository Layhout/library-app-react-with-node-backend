import MostActiveVisitor from "../components/MostActiveVisitor.js";
import TopBooks from "../components/TopBooks.js"

const Statistics = () => {

    return (
        <main>
            <section style={{ margin: "20px 0" }}>
                <TopBooks />
            </section>
            <section>
                <MostActiveVisitor />
            </section>
        </main>
    )
}

export default Statistics
