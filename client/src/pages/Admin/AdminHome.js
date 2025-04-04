import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            consequatur hic voluptatem eaque. Nobis earum vitae voluptas. Iusto
            libero beatae quis corrupti sunt corporis exercitationem facilis sed
            sequi recusandae iste tempore et similique numquam nostrum
            accusamus, temporibus dolor ratione, quasi voluptatibus quos
            laboriosam voluptate aperiam! Officiis earum magnam, doloremque aut
            magni perspiciatis nisi ad labore. Quisquam, aliquid fugiat? Quod
            accusamus adipisci recusandae assumenda possimus, eius doloribus!
            Praesentium animi iure similique doloribus debitis accusamus itaque
            ducimus. A quaerat nesciunt consequuntur, atque iusto esse
            exercitationem doloribus officia. Quod rerum cumque quas eum
            numquam, nam totam quasi fugiat voluptatum veritatis, autem eius
            laboriosam ipsum, hic dolore necessitatibus? Laborum deserunt unde
            impedit sed eius ut praesentium repellat? Mollitia temporibus ex
            recusandae fugit et enim officiis eaque, nihil sunt iste aliquam
            saepe excepturi aut, praesentium est nostrum? Repellendus quos
            minima praesentium fugit quasi aspernatur rem assumenda nisi veniam.
            Laudantium omnis fuga, veritatis est maxime libero exercitationem,
            ut porro quisquam, aliquam inventore dolore nobis illum assumenda
            fugiat doloremque modi maiores. Ea eveniet similique ipsam,
            reiciendis modi doloribus beatae, vitae voluptates eos sint magni!
            Ex suscipit, repellat sit velit, vel reiciendis iusto deserunt
            nostrum hic assumenda quod obcaecati, consequatur dicta ab enim id
            exercitationem alias. Laudantium, impedit.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
