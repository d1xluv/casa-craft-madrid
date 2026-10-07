import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { business, legal, SITE_URL } from "@/content/site";
import { LegalPage, Pending } from "@/components/site/LegalPage";

export const Route = createFileRoute("/aviso-legal")({
  component: LegalNotice,
  head: () =>
    seo({
      path: "/aviso-legal",
      title: "Aviso legal · Reformas HZ",
      description: "Aviso legal e información del titular del sitio web de Reformas HZ.",
    }),
});

function LegalNotice() {
  return (
    <LegalPage title="Aviso legal">
      <h2>1. Datos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la
        sociedad de la información y de comercio electrónico (LSSI), se informa de los datos del
        titular de este sitio web:
      </p>
      <table>
        <tbody>
          <tr>
            <th scope="row">Titular</th>
            <td>
              <Pending
                value={legal.holderFullName}
                what={`nombre y apellidos completos (facilitado: ${legal.holderName})`}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Condición</th>
            <td>{legal.status}</td>
          </tr>
          <tr>
            <th scope="row">NIF / NIE</th>
            <td>{legal.taxId}</td>
          </tr>
          <tr>
            <th scope="row">Nombre comercial</th>
            <td>{legal.tradeName}</td>
          </tr>
          <tr>
            <th scope="row">Domicilio profesional</th>
            <td>
              <Pending value={legal.address} what="domicilio profesional" />
            </td>
          </tr>
          <tr>
            <th scope="row">Correo electrónico</th>
            <td>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">Teléfono</th>
            <td>
              <a href={`tel:+34${business.phone}`}>{business.phoneDisplay}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">Actividad</th>
            <td>Reformas de viviendas, albañilería y pintura</td>
          </tr>
          <tr>
            <th scope="row">Sitio web</th>
            <td>{SITE_URL.replace("https://", "")}</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Objeto</h2>
      <p>
        Este sitio web informa sobre los servicios de reformas, albañilería y pintura de{" "}
        {legal.tradeName} y facilita vías de contacto para solicitar información o presupuesto. El
        sitio no permite contratar ni pagar servicios en línea.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso a este sitio web es gratuito y atribuye la condición de usuario, que se compromete
        a hacer un uso adecuado de sus contenidos conforme a la ley, la buena fe y el orden público,
        y a no emplearlos para actividades ilícitas o que puedan dañar los derechos de terceros o el
        funcionamiento del sitio.
      </p>
      <p>
        La información sobre servicios tiene carácter orientativo. Las condiciones concretas de cada
        trabajo (alcance, precio y plazos) son las que figuren en el presupuesto aceptado por
        escrito.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, fotografías de obras, diseño y el nombre comercial {legal.tradeName} pertenecen
        a su titular o se utilizan con autorización. No se permite su reproducción, distribución o
        transformación con fines comerciales sin autorización previa por escrito.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        El titular procura que la información del sitio sea correcta y esté actualizada, pero no
        garantiza la ausencia de errores ni la disponibilidad continua del sitio, y no se hace
        responsable de los daños derivados de un uso inadecuado del mismo.
      </p>

      <h2>6. Enlaces externos</h2>
      <p>
        El sitio incluye enlaces a servicios de terceros, como WhatsApp, que se abren solo si el
        usuario los pulsa. El titular no controla esos servicios ni es responsable de su contenido o
        de sus condiciones de uso y privacidad.
      </p>

      <h2>7. Protección de datos y cookies</h2>
      <p>
        El tratamiento de datos personales se explica en la{" "}
        <Link to="/privacidad">política de privacidad</Link> y el uso de cookies y almacenamiento
        local en la <Link to="/cookies">política de cookies</Link>.
      </p>

      <h2>8. Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, las
        partes se someten a los juzgados y tribunales que correspondan conforme a la normativa
        aplicable; si el usuario es consumidor, los de su domicilio.
      </p>
    </LegalPage>
  );
}
