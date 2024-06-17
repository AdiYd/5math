import { useContext, useState } from "react";
import { debug } from "../assets/function/functions";
import { User } from "..";


export default function AboutUs({ ...props }) {
    document.title = 'הסיפור שלנו';
    const user = useContext(User);
    debug('Context: ', user, true);

    return (
        <div id='aboutUs' className={`flex center ${user.darkMode ? 'darkMode' : ''}`}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur dui vel accumsan porttitor. Fusce eget porttitor felis, at vestibulum leo. Proin blandit eros at mi lobortis, nec euismod tortor lacinia. Phasellus diam lorem, blandit sed libero sit amet, suscipit elementum felis. Ut nec gravida nunc, eu tempor risus. Fusce ligula turpis, finibus sed mollis a, aliquet vel felis. Fusce nec tempor metus. Morbi laoreet enim vitae quam vehicula, et viverra nulla condimentum. Vivamus viverra leo eu ultrices malesuada. Mauris diam arcu, rhoncus eu ultrices eu, aliquet quis lacus. Phasellus aliquam est a elit vehicula, at luctus leo elementum. Donec semper ac metus a laoreet. Praesent tincidunt urna id pulvinar fringilla. Proin dictum rhoncus lobortis. Praesent varius rutrum lorem vel porta.

                Pellentesque eu turpis quis ipsum ultricies malesuada. Sed quis dapibus massa, et viverra arcu. Sed at tincidunt dolor, ut cursus nisl. Cras faucibus malesuada nisi, vitae mollis magna venenatis vitae. Phasellus vulputate nec mi a gravida. Nulla facilisi. Nulla ante massa, accumsan eu dolor nec, egestas iaculis mi. Quisque at ligula ut mauris vestibulum varius non ut massa. Aliquam erat volutpat. Nunc in viverra mauris. Suspendisse tincidunt ornare consectetur. Ut id dolor massa. Aliquam eu massa eget felis dignissim porta quis sit amet orci. Sed eleifend risus sit amet turpis lobortis, at condimentum massa vehicula.

                Donec gravida felis lectus, eu commodo massa molestie iaculis. Donec mollis in magna ut efficitur. Donec vel placerat dolor. Vestibulum eget quam cursus, mattis ex vitae, eleifend augue. Vivamus lacinia sollicitudin porttitor. Aenean elementum, sapien eu elementum sagittis, diam augue consectetur ex, vel pretium leo ex sed tortor. Aliquam velit metus, consectetur in tempus quis, pharetra volutpat lectus. Nulla vitae dapibus ex, in tempor tortor. Integer nec eros sagittis, accumsan nulla nec, placerat dolor.

                Curabitur tincidunt tellus tortor, quis varius purus rutrum a. Suspendisse vehicula lacinia lacinia. Suspendisse vel mattis erat. Morbi enim ex, egestas nec auctor sit amet, mollis ut lacus. Aenean varius vel sem eget hendrerit. Cras pretium placerat velit. Mauris laoreet id lorem tincidunt iaculis.

                Ut varius, elit id laoreet vulputate, libero lectus bibendum sapien, non rutrum ligula enim et orci. Pellentesque maximus blandit mauris sed convallis. Sed at orci nec enim consequat imperdiet eget et libero. Maecenas porta nibh vel lacus sollicitudin volutpat. Fusce posuere congue ligula at rhoncus. Ut non purus a felis ornare fringilla. In a purus sed enim convallis lacinia. Nam eget suscipit turpis. Etiam vestibulum est eu facilisis pharetra. Cras malesuada augue vitae venenatis consequat. Maecenas aliquet ante vitae dignissim sodales. Nam pellentesque arcu est, a pretium nulla facilisis nec.

                Proin convallis vel nibh eget rutrum. Vivamus venenatis, nibh at cursus porttitor, enim neque hendrerit mi, quis ultrices sapien erat sodales felis. Curabitur tempus condimentum nibh vitae semper. Vivamus sed sodales neque. Maecenas et est in nisi cursus commodo vel ac felis. Integer at varius tortor, quis lobortis orci. Suspendisse vitae ipsum arcu.

                Aenean cursus eu magna nec sagittis. Nulla lacus metus, laoreet at lorem facilisis, tempus maximus nisi. Suspendisse tristique ante non nisl sodales gravida. Mauris at lacinia est. Vestibulum efficitur est ac orci maximus elementum vitae consequat nunc. Curabitur et leo dignissim, convallis nunc a, efficitur est. Cras pharetra metus eu augue malesuada, ut bibendum leo viverra. Nulla id mattis orci. Mauris mollis nulla ullamcorper erat posuere, ut dictum erat mollis. Phasellus volutpat nulla in est consectetur viverra.

                Pellentesque ultricies ornare pulvinar. Nullam eu orci quam. Ut vitae leo at leo facilisis tincidunt a ut massa. Cras sit amet arcu vel magna ullamcorper vehicula. Cras at egestas quam. Suspendisse venenatis libero eget viverra pellentesque. Aliquam nec lacus quis erat viverra iaculis. Nulla convallis pellentesque porttitor. In consectetur massa nulla, ullamcorper pulvinar ex scelerisque id.

                Praesent ligula mi, cursus auctor justo ac, vehicula aliquet mi. Suspendisse vehicula rhoncus justo, at egestas orci efficitur ac. Nulla pretium nisi et tortor tristique sodales. Fusce porta eget nunc sit amet commodo. Vivamus ac risus sed dolor fringilla pharetra. Nullam maximus eros sit amet massa pretium varius. Vestibulum at placerat lorem. Aenean est erat, accumsan ut sollicitudin ac, molestie in lectus. Nullam diam orci, lobortis vel varius non, molestie eget leo. Praesent faucibus nibh ullamcorper leo eleifend, id pretium enim tempor. Integer vitae massa vel nisl ullamcorper bibendum vitae a lectus. Sed semper urna ut ipsum fermentum ultricies. Pellentesque rutrum convallis elit, ut feugiat arcu commodo ac. Donec blandit lorem sed venenatis sagittis. Curabitur cursus enim nunc, nec tempor lorem mattis id. Curabitur convallis lorem risus, a imperdiet lectus pretium eu.

                Nam et tristique erat. Nunc in ullamcorper leo, et tincidunt dui. Fusce fermentum accumsan sollicitudin. Aenean molestie auctor vestibulum. Phasellus vel tortor nisi. Etiam blandit eleifend neque ut facilisis. Morbi ac placerat leo. Suspendisse potenti. Integer tempor quis nulla nec aliquet.
            </p>
        </div>
    )
}