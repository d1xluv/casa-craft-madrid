import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { legal } from "@/content/site";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  component: Cookies,
  head: () =>
    seo({
      path: "/cookies",
      title: "Política de cookies · Reformas HZ",
      description:
        "Información sobre las cookies y el almacenamiento local que utiliza la web de Reformas HZ.",
    }),
});

function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <h2>1. Resumen</h2>
      <p>
        <strong>Esta web no instala cookies</strong> y no utiliza herramientas de analítica,
        publicidad, redes sociales, mapas ni vídeos de terceros. Por eso no le mostramos un aviso
        para aceptar o rechazar cookies: no hay nada que requiera su consentimiento.
      </p>
      <p>
        Lo único que se guarda en su navegador es su preferencia de idioma (si la elige) y la
        posición de desplazamiento de las páginas mientras navega. Son almacenamientos técnicos,
        necesarios para el funcionamiento que usted solicita y exentos de consentimiento conforme al
        artículo 22.2 de la Ley 34/2002 (LSSI) y a la Guía sobre el uso de las cookies de la Agencia
        Española de Protección de Datos.
      </p>

      <h2>2. ¿Qué son las cookies y tecnologías similares?</h2>
      <p>
        Son pequeños archivos o registros que una web guarda en el navegador del usuario para
        recordar información. Las normas sobre cookies se aplican también a tecnologías similares,
        como el almacenamiento local del navegador (<em>localStorage</em>).
      </p>

      <h2>3. Qué utiliza esta web</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Finalidad</th>
            <th>Titular</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>lang</code>
            </td>
            <td>Almacenamiento local (no es una cookie)</td>
            <td>
              Recordar el idioma (español o inglés) que usted elige con el selector ES / EN. Solo se
              crea si pulsa el selector.
            </td>
            <td>Propio</td>
            <td>Hasta que la borre desde su navegador</td>
          </tr>
          <tr>
            <td>
              <code>tsr-scroll-restoration-v1_3</code>
            </td>
            <td>Almacenamiento de sesión (no es una cookie)</td>
            <td>
              Recordar en qué punto de cada página estaba al volver atrás con el navegador. Lo crea
              el sistema de navegación de la web.
            </td>
            <td>Propio</td>
            <td>Se borra al cerrar la pestaña</td>
          </tr>
        </tbody>
      </table>
      <p>
        Estos datos no identifican al usuario, no se envían a ningún servidor y no se usan para
        ningún otro fin.
      </p>

      <h2>4. Servicios externos</h2>
      <ul>
        <li>
          <strong>Tipografías:</strong> se sirven desde el propio servidor de la web, sin conexiones
          a Google Fonts ni a otros terceros.
        </li>
        <li>
          <strong>WhatsApp:</strong> los botones de WhatsApp son enlaces normales. No se carga nada
          de WhatsApp o Meta al visitar la web; solo al pulsarlos se abre ese servicio, que aplica
          sus propias políticas.
        </li>
        <li>
          <strong>Formulario de contacto:</strong> al enviarlo, los datos se transmiten a{" "}
          {legal.formProvider} para que nos lleguen por correo. El envío no instala cookies en esta
          web. Más información en la <Link to="/privacidad">política de privacidad</Link>.
        </li>
      </ul>

      <h2>5. Cómo borrar o bloquear el almacenamiento</h2>
      <p>
        Puede eliminar estos datos y cualquier otro del sitio desde la configuración de privacidad
        de su navegador (opción «Borrar datos de sitios» o similar). La web seguirá funcionando con
        normalidad, en español.
      </p>

      <h2>6. Cambios</h2>
      <p>
        Si en el futuro se incorporan herramientas que usen cookies no necesarias (por ejemplo,
        analítica, mapas o vídeos incrustados), no se activarán hasta que usted las acepte. En ese
        momento se añadirá un panel que permitirá aceptar, rechazar o configurar cada tipo con la
        misma facilidad, y cambiar la elección en cualquier momento, y se actualizará esta política.
      </p>
    </LegalPage>
  );
}
