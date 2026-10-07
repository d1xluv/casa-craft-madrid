import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { business, legal } from "@/content/site";
import { LegalPage, Pending } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacidad")({
  component: Privacy,
  head: () =>
    seo({
      path: "/privacidad",
      title: "Política de privacidad · Reformas HZ",
      description:
        "Cómo trata Reformas HZ los datos personales de quienes solicitan información o presupuesto.",
    }),
});

function Privacy() {
  const email = legal.privacyEmail;
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Esta política explica cómo se tratan los datos personales que nos facilita al contactar con{" "}
        {legal.tradeName}, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de
        Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          Titular:{" "}
          <Pending
            value={legal.holderFullName}
            what={`nombre y apellidos completos (facilitado: ${legal.holderName})`}
          />
          , {legal.status.toLowerCase()}, con nombre comercial {legal.tradeName}.
        </li>
        <li>NIF / NIE: {legal.taxId}</li>
        <li>
          Domicilio profesional: <Pending value={legal.address} what="domicilio profesional" />
        </li>
        <li>
          Correo electrónico: <a href={`mailto:${email}`}>{email}</a> · Teléfono:{" "}
          {business.phoneDisplay}
        </li>
      </ul>

      <h2>2. Qué datos tratamos y de dónde proceden</h2>
      <p>Solo tratamos los datos que usted nos facilita voluntariamente:</p>
      <ul>
        <li>
          <strong>Formulario de contacto:</strong> nombre, teléfono, correo electrónico (opcional),
          localidad de la obra (opcional), tipo de trabajo y la descripción que escriba.
        </li>
        <li>
          <strong>Teléfono, WhatsApp o correo:</strong> los datos y la información que nos comunique
          por esas vías, incluidas las fotos del espacio que decida enviarnos.
        </li>
      </ul>
      <p>
        Le pedimos que no incluya en el mensaje datos que no sean necesarios para valorar el
        trabajo. Esta web no utiliza herramientas de analítica ni de publicidad y no crea perfiles
        de los visitantes.
      </p>

      <h2>3. Para qué usamos sus datos y con qué base legal</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base jurídica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Responder a su consulta y, si lo solicita, visitar el inmueble y preparar un
              presupuesto.
            </td>
            <td>
              Aplicación de medidas precontractuales a petición del interesado (art. 6.1.b RGPD).
              Para consultas generales, su consentimiento al enviarnos el mensaje (art. 6.1.a RGPD),
              que puede retirar en cualquier momento.
            </td>
          </tr>
          <tr>
            <td>
              Si contrata el trabajo: ejecutarlo, facturarlo y cumplir las obligaciones fiscales y
              contables.
            </td>
            <td>
              Ejecución del contrato (art. 6.1.b RGPD) y cumplimiento de obligaciones legales (art.
              6.1.c RGPD).
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Sin publicidad</h3>
      <p>
        Enviar una solicitud de contacto <strong>no</strong> supone aceptar comunicaciones
        comerciales. No utilizamos sus datos para enviarle publicidad. Si en el futuro quisiéramos
        hacerlo, le pediríamos antes un consentimiento específico y separado, que sería siempre
        opcional.
      </p>

      <h2>4. Datos obligatorios</h2>
      <p>
        En el formulario son obligatorios el nombre, el teléfono, el tipo de trabajo y la
        descripción, porque sin ellos no podemos atender la solicitud. El resto de campos son
        opcionales.
      </p>

      <h2>5. Cuánto tiempo conservamos los datos</h2>
      <ul>
        <li>
          Solicitudes que no terminan en encargo: el tiempo necesario para atenderlas y, como
          máximo, {legal.enquiryRetention.es} desde el último contacto, salvo que nos pida antes su
          supresión.
        </li>
        <li>
          Clientes: mientras dure la relación y, después, durante los plazos exigidos por la
          normativa fiscal y mercantil y los de prescripción de posibles responsabilidades.
        </li>
      </ul>

      <h2>6. Destinatarios y proveedores</h2>
      <p>
        No cedemos sus datos a terceros salvo obligación legal. Para prestar el servicio intervienen
        estos proveedores:
      </p>
      <ul>
        <li>
          <strong>{legal.formProvider}</strong>: recibe los datos del formulario y los reenvía a
          nuestro correo electrónico, como encargado del tratamiento. Es un proveedor con sede en
          Estados Unidos; la transferencia internacional se ampara en las cláusulas contractuales
          tipo aprobadas por la Comisión Europea.
        </li>
        <li>
          <strong>Proveedor de correo electrónico (Google, Gmail)</strong>: en él recibimos y
          guardamos los mensajes. Google puede tratar datos fuera del Espacio Económico Europeo con
          las garantías previstas en el RGPD (Marco de Privacidad de Datos UE-EE. UU. y cláusulas
          contractuales tipo).
        </li>
        <li>
          <strong>Alojamiento web ({legal.hosting})</strong>: sirve las páginas de la web y, como
          cualquier servidor, puede registrar datos técnicos de la conexión (como la dirección IP)
          por motivos de seguridad.
        </li>
      </ul>
      <p>
        <strong>WhatsApp:</strong> si decide escribirnos por WhatsApp, la conversación se produce en
        ese servicio (WhatsApp Ireland Ltd., del grupo Meta) y queda sujeta también a sus propias
        condiciones y política de privacidad. El botón de la web solo abre la aplicación; no se
        envía nada hasta que usted lo confirma.
      </p>

      <h3>Reseñas de Google</h3>
      <p>
        La página de reseñas muestra opiniones que sus autores han publicado en Google, con su
        nombre público tal y como aparece allí y un enlace a la reseña original. Se obtienen de
        Google al publicar la web; su navegador no conecta con Google al verlas. Si es autor de una
        reseña y quiere que no se muestre aquí, escríbanos.
      </p>

      <h2>7. Sus derechos</h2>
      <p>
        Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del
        tratamiento y portabilidad, así como retirar el consentimiento prestado, escribiendo a{" "}
        <a href={`mailto:${email}`}>{email}</a> e indicando qué derecho quiere ejercer. Podemos
        pedirle que acredite su identidad si tenemos dudas razonables sobre ella.
      </p>
      <p>
        Si considera que no hemos atendido correctamente su solicitud, puede presentar una
        reclamación ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          www.aepd.es
        </a>
        ).
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas razonables para proteger sus datos: la web funciona con conexión cifrada
        (HTTPS) y el acceso al correo donde se reciben las solicitudes está restringido al titular.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Esta web no usa cookies de analítica ni de publicidad. Puede consultar el detalle en la{" "}
        <Link to="/cookies">política de cookies</Link>.
      </p>

      <h2>10. Cambios en esta política</h2>
      <p>
        Si cambian los tratamientos (por ejemplo, si se incorporan nuevos servicios o herramientas),
        se actualizará esta política y la fecha que figura al principio.
      </p>
    </LegalPage>
  );
}
