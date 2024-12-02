import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterailDrop";
import { forwardRef, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

const Container = forwardRef<{}, CommonComponentProps>(({ id, name, children, styles }, ref) => {

  const { canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Table', 'Form'], id);
  const divRef = useRef<HTMLDivElement>(null);

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id
    }
  })

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  })

  return (
    <div
      data-component-id={id}
      ref={divRef}
      style={styles}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      {children}
    </div>
  );
});

export default Container;