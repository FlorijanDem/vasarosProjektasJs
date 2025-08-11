import CardsGridAdmin from "../../components/CardsGrid/CardsGridAdmin"
import Nav from "../../components/Nav/Nav"

const AdminPanel = () => {
    
return(
    <>
    <Nav/>
    <div className="flex flex-col px-64 py-32 w-full h-vh">
      <div className="h-full w-full flex flex-col gap-16">
          <h1 className="text-5xl font-bold text-gray-700">
            Administrator - Excursion management
          </h1>
          <CardsGridAdmin/>
      </div>
    </div>
    </>
)
}
export default AdminPanel
